const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require('fast-csv');
const path = require('path');

const CSV_FILE = path.join(__dirname, '../data/countries.csv');

module.exports = {
  up: (queryInterface) => {
    const stream = fs.createReadStream(CSV_FILE, { encoding: 'utf8' });
    const countries = [];
    const codes = new Set();

    return new Promise((resolve) => {
      csv
        .fromStream(stream, { headers: true })
        .on('data', (data) => {
          const code = data.code.toLowerCase();
          if (!codes.has(code)) {
            codes.add(code);
            countries.push({ code: data.code, name: data.name });
          }
        })
        .on('end', () => {
          queryInterface.bulkInsert('countries', countries, {}).then(() => resolve());
        });
    });
  },
  down: queryInterface => queryInterface.bulkDelete('countries', null, {}),
};
