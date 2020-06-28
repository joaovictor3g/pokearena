import { Request, Response } from 'express';
import connection from '../database/connection';
import Knex from 'knex';

const addPokemonToTrainer = {
    async create(req: Request, res: Response) { 
        const { id } = req.params;
        const { idsPokemon } = req.body;

        const trx = await connection.transaction();

        const id_trainer = id;

        const insertPokemonAndTrainer = idsPokemon
            .split(',')
            .map((id_pokemon: string) => Number(id_pokemon.trim()))
            .map((id_pokemon: number) => {
                return {
                    id_pokemon,
                    id_trainer
                }
            });

        await trx('pokemon_trainer')
            .insert(insertPokemonAndTrainer);

        await trx.commit();
        
        return res.json({ message: 'Everything right' });
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const response =  await connection('pokemon_trainer')
            .select('*')
            .where('pokemon_trainer.id_trainer', id)
            .first();
        
        return res.json(response)
    },
};

export default addPokemonToTrainer;