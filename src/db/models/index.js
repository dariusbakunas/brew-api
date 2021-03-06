import Sequelize from 'sequelize';
import country from './country';
import hop from './hop';
import user from './user';
import role from './role';
import quote from './quote';
import invitation from './invitation';
import fermentable from './fermentable';
import yeastLab from './yeastLab';
import yeast from './yeast';
import water from './water';
import recipe from './recipe';
import recipeFermentable from './recipeFermentable';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database.js')[process.env.USE_STAGING_DB === 'true' ? 'staging' : env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modules = [
  country,
  hop,
  user,
  role,
  quote,
  invitation,
  fermentable,
  yeastLab,
  yeast,
  water,
  recipe,
  recipeFermentable,
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
