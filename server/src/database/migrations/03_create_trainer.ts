import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('trainer', table => {
        table.increments('id_trainer').primary().notNullable();
        table.string('name').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('trainer');
}