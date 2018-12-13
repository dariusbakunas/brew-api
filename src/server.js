import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import logger from './logger';
import loadSchemas from './schema/loadSchemas';
import db from './db/models/index';
import resolvers from './resolvers/index';
import hasScopeDirective from './directives/hasScopeDirective';
import EmailSender from './email/emailSender';

const typeDefs = loadSchemas();
const emailSender = new EmailSender();

const getUserScopes = (user) => {
  const scopes = [];

  if (!user.status) {
    // display random quote on login screen
    scopes.push('get:randomQuote');
  } else if (user.status === 'GUEST') {
    // cancel registration form, go back to login screen
    scopes.push('get:randomQuote');
    scopes.push('registerUser');
  }

  if (user.initialAuth) {
    scopes.push('initialAuth');
  }

  return scopes;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    db,
    emailSender,
  }),
  schemaDirectives: {
    hasScope: hasScopeDirective,
  },
  context: async ({ req }) => {
    const user = {
      ...req.user,
      scopes: getUserScopes(req.user),
    };

    return { user };
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

const port = 4000;

app.listen({ port }, () => logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
