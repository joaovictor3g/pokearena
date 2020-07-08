import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('nickname_pokemon', table => {
        table.increments('idNickname').primary().notNullable();
        table.string('nickname').notNullable();
        table.integer('id_trainer').notNullable();
        table.integer('id_pokemon').notNullable();
        table.foreign('id_trainer').references('id_trainer').inTable('trainer');
        table.foreign('id_pokemon').references('id_pokemon').inTable('pokemon');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('nickname_pokemon')
}