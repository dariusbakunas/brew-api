const jwt = require('jsonwebtoken');
const username = process.argv[2];
const logger = require('../src/logger');

if (!process.env.JWT_SECRET) {
  logger.error('process.env.JWT_SECRET must be specified');
  process.exit(1);
}

if (!username) {
  logger.error('usage: npm run token:gen [username]');
  process.exit(1);
}

const token = jwt.sign({ user: { username, isAdmin: true } }, process.env.JWT_SECRET);
logger.info(`YOUR TOKEN: ${token}`);
