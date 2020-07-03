import { Request, Response } from 'express';
import connection from '../database/connection';
import api from '../services/api';
import axios from 'axios';

const addAbility = {
    async index(req: Request, res: Response) {
        const { id_pokemon } = req.params;

        const idAbilities = await connection('pokemon')
            .join('pokemon_abilities', 'pokemon_abilities.id_pokemon', 'pokemon.id_pokemon')
            .where('pokemon.id_pokemon', id_pokemon)
            .select('pokemon_abilities.id_ability');
        
        return res.json(idAbilities);
    },
    
    async create(req: Request, res: Response) {
        const { id_pokemon } = req.params;

        const response = await api.get(`/pokemon/${id_pokemon}`);

        const abilities = response.data.abilities;

        const names = abilities
            .map((ability: { ability: { name: string } }) => (ability.ability.name));

        const urls: string[] = abilities
            .map((ability: { ability: { url: string } }) => (ability.ability.url)); 
        
        // Criação de uma transaction afim de evitar que se uma inserção dê errado ele não insira no proximo.
        const trx = await connection.transaction();

        const validate = await trx('ability').select('id_ability');

        const validatePokemon = await trx('pokemon_abilities').select('id_pokemon');

        const result = validate.map((validate: { id_ability: number }) => (validate.id_ability));

        const resultPokemon = validatePokemon.map((validate: { id_pokemon: any }) => (validate.id_pokemon));

        let cont = 0;

        urls.map(async(url: string, idx: number) => {
            const response = await axios.get(url);
            
            const effect = response.data.effect_entries[1].effect;

            const id_ability = response.data.id;

            cont++;

            try { 
                if(!result.includes(id_ability)) {
                    await trx('ability').insert({ id_ability, name: names[idx], effect });
                    //await trx.commit();
                }

                if(result[idx]===id_ability && resultPokemon[idx]===id_pokemon) {
                    await trx('pokemon_abilities')
                        .insert({ id_pokemon, id_ability });

                }

                await trx.commit();
                
            } catch(err) {
                console.log('Deu erro');
                //await trx.rollback();
            }

        });

        //await trx.commit();

        return res.json({ message: 'Ability added' })
    },  
};

export default addAbility;