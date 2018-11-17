import express from 'express';
import morgan from 'morgan';
import { ApolloServer, gql } from 'apollo-server-express';
import logger from './logger';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use(morgan('combined', {
  skip: req => req.url === '/health-check',
}));

server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () => logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
