import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import logger from './logger';
import loadSchemas from './schema/loadSchemas';
import db from './db/models/index';
import resolvers from './resolvers/index';
import EmailSender from './email/emailSender';
import permissionMiddleware from './permissions/middleware';

const typeDefs = loadSchemas();
const emailSender = new EmailSender();

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

passport.use(new Strategy(passportOpts, (payload, done) => {
  if (payload) {
    done(null, payload.user);
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

server.applyMiddleware({ app });

const port = process.env.PORT || 8080;

app.listen({ port }, () => logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
