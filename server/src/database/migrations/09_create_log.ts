import Knex from 'knex';
import { table } from 'console';

export async function up(knex: Knex) {
    return knex.schema.createTable('changelog', table => {
        table.increments('id').notNullable().primary();
        table.string('description').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('changelog');
}