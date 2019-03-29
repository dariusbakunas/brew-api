import fs from 'fs';
import path from 'path';

function loadSchemas(basePath = path.join(__dirname, './schema')) {
  const schemaFiles = [
    'main',
    'user',
    'country',
    'hop',
    'quote',
    'fermentable',
    'yeast',
    'water',
    'recipe',
  ];

  return schemaFiles.map(file => fs.readFileSync(path.join(basePath, `${file}.graphql`), 'utf8')).join('');
}

export default loadSchemas;
