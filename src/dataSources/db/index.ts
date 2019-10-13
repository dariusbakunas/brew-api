import { Model } from 'objection';
import Knex from 'knex';
import { Invitation } from './models/invitation';
import { User } from './models/user';
import { Country } from './models/country';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import config from '../../../knexfile';

const knex = Knex(config[process.env.NODE_ENV]);

//knex.migrate.latest();
Model.knex(knex);

export interface IDBService {
  User: typeof User;
  Invitation: typeof Invitation;
  Country: typeof Country;
}

const db: IDBService = {
  Country,
  Invitation,
  User,
};

export default db;
