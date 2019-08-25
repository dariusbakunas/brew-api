import express from "express";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "graphql-tools";
import rateLimit from "express-rate-limit";
import Sequelize from "sequelize";
import * as Sentry from "@sentry/node";
import db from "./dataSources/db/models/index";
import logger from "./logger";
import loadSchema from "./schema/loadSchema";
import resolvers from "./resolvers/index";
import permissionMiddleware from "./permissions/middleware";
import pJson from "../package.json";
import dataSources from "./dataSources";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

Sentry.init({
  dsn: "https://de2d029de9864c578f4dfc3bec83a0c4@sentry.io/1442438",
  release: `${pJson.name}@${pJson.version}`,
});

const typeDefs = loadSchema();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissionMiddleware
);

const server = new ApolloServer({
  schema,
  dataSources,
  //TODO: add user type
  context: async ({ req }: ExpressContext & { req: { user: any } }) => {
    return { user: req.user };
  },
  formatError: (error) => {
    Sentry.captureException(error);
    logger.error(error.message);
    return error;
  },
});

const passportOpts = {
  jwtFromRequest: ExtractJwt.fromHeader("auth-token"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(passportOpts, async (payload, done) => {
    if (payload) {
      const { user: requestUser } = payload;

      if (requestUser.status === "ACTIVE") {
        // TODO: only select specific attributes
        const user = await db.User.findOne({
          include: [
            {
              model: db.Role,
              as: "roles",
            },
          ],
          where: {
            email: {
              [Sequelize.Op.eq]: requestUser.email,
            },
          },
          plain: true,
        });

        if (!user) {
          done("Forbidden");
        } else {
          const { id, email, username } = user;

          Sentry.configureScope((scope) => {
            scope.setUser({ id, email, username });
          });

          done(null, user.toJSON());
        }
      } else {
        if (requestUser.status === "GUEST") {
          // user at login screen
          Sentry.configureScope((scope) => {
            scope.setUser({ username: "GUEST" });
          });
        } else {
          // new user, not yet registered
          const { email, username } = requestUser;

          Sentry.configureScope((scope) => {
            scope.setUser({ username, email });
          });
        }

        done(null, requestUser);
      }
    } else {
      done("Forbidden");
    }
  })
);

const app = express();

app.get("/health-check", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Status: OK!");
});

app.use("*", passport.authenticate("jwt", { session: false }));

app.use(
  morgan("combined", {
    skip: (req) => req.url === "/health-check",
  })
);

app.use("/graphql/", limiter);

server.applyMiddleware({ app });

const port = process.env.PORT || 8080;

app.listen({ port }, () =>
  logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
