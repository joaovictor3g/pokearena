import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('trainer', table => {
        table.increments('id_trainer').primary().notNullable();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.boolean('is_online');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('trainer');
}