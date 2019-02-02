const fs = require('fs');
const path = require('path');

const config = {
  development: {
    username: 'database_dev',
    password: 'database_dev',
    database: 'database_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql',
  },
};

if (process.env.PROD_DB_SSL_KEY) {
  const key = fs.readFileSync(process.env.PROD_DB_SSL_KEY);
  const cert = fs.readFileSync(process.env.PROD_DB_SSL_CERT);
  const ca = fs.readFileSync(process.env.PROD_DB_SSL_CA);

  config.production.dialectOptions = {
    ssl: {
      key,
      cert,
      ca,
    },
  };
}

module.exports = config;
