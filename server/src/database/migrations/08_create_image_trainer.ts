import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('trainer_image', table => {
        table.increments('id_image').notNullable().primary();
        table.string('image').notNullable();
        table.integer('id_trainer').notNullable();
        table.foreign('id_trainer').references('id_trainer').inTable('trainer');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('trainer_image');
}