import { Model } from 'objection';

export class Country extends Model {
  static tableName = 'countries';

  readonly id!: number;
  name!: string;
  code!: string;
}
