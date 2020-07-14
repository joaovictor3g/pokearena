import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pokemon_type', table => {
        table.integer('id_pokemon').notNullable();
        table.integer('id_type').notNullable();
        table.foreign('id_pokemon').references('id_pokemon').inTable('pokemon');
        table.foreign('id_type').references('id_type').inTable('typing');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pokemon_type');
}