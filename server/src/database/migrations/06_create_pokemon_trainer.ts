import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pokemon_trainer', table => {
        table.integer('id_pokemon').notNullable();
        table.integer('id_trainer').notNullable();
        table.foreign('id_pokemon').references('id_pokemon').inTable('pokemon');
        table.foreign('id_trainer').references('id_trainer').inTable('trainer');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pokemon_trainer');
}