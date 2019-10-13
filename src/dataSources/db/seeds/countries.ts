import * as Knex from 'knex';
import path from 'path';
import fs from 'fs';
import csv from 'fast-csv';

const CSV_FILE = path.join(__dirname, './data/countries.csv');

interface ICountry {
  code: string;
  name: string;
}

export async function seed(knex: Knex): Promise<any> {
  const stream = fs.createReadStream(CSV_FILE, { encoding: 'utf8' });
  const codes = new Set();

  const parse = (): Promise<ICountry[]> =>
    new Promise(resolve => {
      const countries: ICountry[] = [];

      csv
        .fromStream(stream, { headers: true })
        .on('data', (data: ICountry) => {
          const code = data.code.toLowerCase();
          if (!codes.has(code)) {
            codes.add(code);
            countries.push({ code: data.code, name: data.name });
          }
        })
        .on('end', () => {
          resolve(countries);
        });
    });

  const countries = await parse();

  // Deletes ALL existing entries
  return knex('countries')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('countries').insert(countries);
    });
}
