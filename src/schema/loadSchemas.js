import fs from 'fs';
import path from 'path';

function loadSchemas(basePath = path.join(__dirname, './schema')) {
  const mainSchema = fs.readFileSync(path.join(basePath, './main.graphql'), 'utf8');
  const userSchema = fs.readFileSync(path.join(basePath, './user.graphql'), 'utf8');
  const countrySchema = fs.readFileSync(path.join(basePath, './country.graphql'), 'utf8');
  const hopSchema = fs.readFileSync(path.join(basePath, './hop.graphql'), 'utf8');
  const quoteSchema = fs.readFileSync(path.join(basePath, './quote.graphql'), 'utf8');
  const fermentableSchema = fs.readFileSync(path.join(basePath, './fermentable.graphql'), 'utf8');
  const yeastSchema = fs.readFileSync(path.join(basePath, './yeast.graphql'), 'utf8');
  const waterSchema = fs.readFileSync(path.join(basePath, './water.graphql'), 'utf8');
  return [hopSchema, userSchema, mainSchema, countrySchema,
    quoteSchema, fermentableSchema, yeastSchema, waterSchema].join('');
}

export default loadSchemas;
