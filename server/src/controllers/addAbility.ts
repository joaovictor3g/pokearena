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

        const getAbilities = response.data.abilities.map((ability: { ability: { name: string, url: string }}) => { 
            return {
                name: ability.ability.name,
                url: ability.ability.url
            } 
        });

        const trx = await connection.transaction();

        const isAlreadyExists = await connection('ability').select('name');

        const result = isAlreadyExists.map((ability: { name: string }) => ability.name);

        getAbilities.map(async(ability: { name: string, url: string }, idx: number) => {
            const res = await axios.get(ability.url);

            if(!result.includes(ability.name)) {
                await trx('ability').insert({ name: ability.name, effect: res.data.effect_entries[1].effect, id_ability: res.data.id });
                
            }
            await trx('pokemon_abilities').insert({ id_pokemon, id_ability: res.data.id });

            await trx.commit();
        })

        return res.json({ message: 'deu certo' })
    },  
};

export default addAbility;