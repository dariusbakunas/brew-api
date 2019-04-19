import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import rateLimit from 'express-rate-limit';
import Sequelize from 'sequelize';
import * as Sentry from '@sentry/node';
import logger from './logger';
import loadSchemas from './schema/loadSchemas';
import db from './db/models/index';
import resolvers from './resolvers/index';
import EmailSender from './email/emailSender';
import permissionMiddleware from './permissions/middleware';

Sentry.init({ dsn: 'https://de2d029de9864c578f4dfc3bec83a0c4@sentry.io/1442438' });

const typeDefs = loadSchemas();
const emailSender = new EmailSender();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissionMiddleware,
);

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    db,
    emailSender,
  }),
  context: async ({ req }) => {
    return { user: req.user };
  },
  formatError: error => {
    logger.error(error.message);
    return error;
  },
});

const passportOpts = {
  jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new Strategy(passportOpts, async (payload, done) => {
  if (payload) {
    const { user: requestUser } = payload;

    // TODO: maybe load user from database instead?
    if (requestUser.status === 'ACTIVE') {
      // TODO: only select specific attributes
      const user = await db.User.findOne({
        include: [{
          model: db.Role,
          as: 'roles',
        }],
        where: {
          email: {
            [Sequelize.Op.eq]: requestUser.email,
          },
        },
        plain: true,
      });
      done(null, user.toJSON());
    } else {
      done(null, requestUser);
    }
  } else {
    done('Forbidden');
  }
}));

const app = express();

app.get('/health-check', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Status: OK!');
});

app.use('*', passport.authenticate('jwt', { session: false }));

app.use(morgan('combined', {
  skip: req => req.url === '/health-check',
}));

app.use('/graphql/', limiter);

server.applyMiddleware({ app });

const port = process.env.PORT || 8080;

app.listen({ port }, () => logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
