import Sequelize from 'sequelize';
import country from './country';
import hop from './hop';
import flavorProfile from './flavorProfile';

const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/database.js')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modules = [
  country,
  flavorProfile,
  hop,
];

// Initialize models
modules.forEach((module) => {
  const model = module(sequelize, Sequelize, config);
  db[model.name] = model;
});

// Apply associations
Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
