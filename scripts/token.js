const jwt = require('jsonwebtoken');
const username = process.argv[2];
const logger = require('../src/logger');
const PERMISSIONS = require('../src/permissions/permissions');

if (!process.env.JWT_SECRET) {
  logger.error('process.env.JWT_SECRET must be specified');
  process.exit(1);
}

if (!username) {
  logger.error('usage: npm run token:gen [username]');
  process.exit(1);
}

const allPermissions = Object.values(PERMISSIONS);

const token = jwt.sign({ user: { username, permissions: allPermissions } }, process.env.JWT_SECRET);
logger.info(`YOUR TOKEN: ${token}`);
