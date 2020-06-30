import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('ability', table => {
        table.integer('id_ability').primary().notNullable();
        table.string('name').notNullable();
        table.string('effect').primary().notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('ability');
}