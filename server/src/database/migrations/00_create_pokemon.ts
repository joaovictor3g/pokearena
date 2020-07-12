import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pokemon', table => {
        table.integer('id_pokemon').primary().notNullable();
        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('description', 10000).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pokemon');
}