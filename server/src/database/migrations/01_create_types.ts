import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('type', table => {
        table.integer('id_type').primary().notNullable();
        table.string('name').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('type');
}