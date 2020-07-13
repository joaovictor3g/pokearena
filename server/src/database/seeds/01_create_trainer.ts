import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('trainer').insert([
        { 
            name: "Ash",
            password: "1234",
            is_online: false
        },
    ])
}