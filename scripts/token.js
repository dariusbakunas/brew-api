const jwt = require('jsonwebtoken');
const username = process.argv[2];
const logger = require('../src/logger');
const SCOPES = require('../src/permissions/scopes');

if (!process.env.JWT_SECRET) {
  logger.error('process.env.JWT_SECRET must be specified');
  process.exit(1);
}

if (!username) {
  logger.error('usage: npm run token:gen [username]');
  process.exit(1);
}

const allScopes = Object.values(SCOPES);

const token = jwt.sign({ user: username, scopes: allScopes }, process.env.JWT_SECRET);
logger.info(`YOUR TOKEN: ${token}`);
