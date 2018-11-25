import fs from 'fs';

const schemaLocation = process.env.SCHEMA_LOCATION || __dirname;

function loadSchemas() {
  const mainSchema = fs.readFileSync(schemaLocation.concat('/main.graphql'), 'utf8');
  const userSchema = fs.readFileSync(schemaLocation.concat('/user.graphql'), 'utf8');
  const countrySchema = fs.readFileSync(schemaLocation.concat('/country.graphql'), 'utf8');
  const hopSchema = fs.readFileSync(schemaLocation.concat('/hop.graphql'), 'utf8');
  return [hopSchema, userSchema, mainSchema, countrySchema].join('');
}

export default loadSchemas;
