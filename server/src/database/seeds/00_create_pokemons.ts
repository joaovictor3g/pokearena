import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('pokemon').insert([
        { 
            id_pokemon: 1, 
            name: 'bulbasaur', 
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            description: 'pokemon in grass'
        },
    ])
}