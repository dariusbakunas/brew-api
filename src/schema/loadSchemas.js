import fs from 'fs';

function loadSchemas() {
  const mainSchema = fs.readFileSync(__dirname.concat('/main.graphql'), 'utf8');
  const countrySchema = fs.readFileSync(__dirname.concat('/country.graphql'), 'utf8');
  const flavorProfileSchema = fs.readFileSync(__dirname.concat('/flavorProfile.graphql'), 'utf8');
  const hopSchema = fs.readFileSync(__dirname.concat('/hop.graphql'), 'utf8');
  return [mainSchema, countrySchema, flavorProfileSchema, hopSchema].join('');
}

export default loadSchemas;
