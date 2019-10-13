import express, { Request } from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import rateLimit from 'express-rate-limit';
import Sequelize from 'sequelize';
import * as Sentry from '@sentry/node';
import db from '../old/db/models/index';
import Cache from 'node-cache';
import logger from './logger';
import loadSchema from './schema/loadSchema';
import resolvers from './resolvers/index';
import permissionMiddleware from './permissions/middleware';
import pJson from '../package.json';
import dataSources from './dataSources';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import jwtMiddleware from './auth/jwtMiddleware';
import request from './utils/request';
import { ContextFunction } from 'apollo-server-core';
import { ApolloContext } from './types';
import apolloContext from './auth/apolloContext';

interface User {
  email: string;
  username: string;
}

Sentry.init({
  dsn: 'https://de2d029de9864c578f4dfc3bec83a0c4@sentry.io/1442438',
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
  context: apolloContext,
  formatError: error => {
    Sentry.captureException(error);
    logger.error(error.message);
    return error;
  },
});

const app = express();

if (
  process.env.NODE_ENV === 'production' ||
  (process.env.NODE_ENV === 'development' && process.env.USE_TEST_USER !== 'true')
) {
  app.use(jwtMiddleware);
} else {
  logger.warn('Token authentication is disabled!!!');
}

app.get('/health-check', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Status: OK!');
});

app.use(
  morgan('combined', {
    skip: (req: Request) => req.url === '/health-check',
  })
);

app.use('/graphql/', limiter);

server.applyMiddleware({ app });

const port = process.env.PORT || 8080;

app.listen({ port }, () =>
  logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
