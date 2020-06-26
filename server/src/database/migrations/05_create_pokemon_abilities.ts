import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pokemon_abilities', table => {
        table.integer('id_pokemon').notNullable();
        table.integer('id_ability').notNullable();
        table.foreign('id_pokemon').references('id_pokemon').inTable('pokemon');
        table.foreign('id_ability').references('id_ability').inTable('ability');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pokemon_abilities');
}