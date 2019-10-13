import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('countries', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('code', 2)
      .notNullable()
      .unique();
    t.string('name', 128)
      .notNullable()
      .unique();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('countries');
}
