import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import logger from './logger';
import loadSchemas from './schema/loadSchemas';
import db from './db/models/index';
import resolvers from './resolvers/index';

const typeDefs = loadSchemas();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    db,
  }),
});

const app = express();

app.use(morgan('combined', {
  skip: req => req.url === '/health-check',
}));

server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () => logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
