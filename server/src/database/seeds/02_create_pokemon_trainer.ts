import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('pokemon_trainer').insert([
        {   
            id_pokemon: 1,
            id_trainer: 1
        },
    ])
}