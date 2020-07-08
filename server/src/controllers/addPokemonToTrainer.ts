import { Request, Response } from 'express';
import connection from '../database/connection';

const addPokemonToTrainer = {
    async create(req: Request, res: Response) { 
        const { id } = req.params;
        const { idsPokemon } = req.body;

        //const trx = await connection.transaction();

        const id_trainer = Number(id);
        const id_pokemon = Number(idsPokemon);

        /*const insertPokemonAndTrainer = idsPokemon
            .split(',')
            .map((idPokemon: string) => Number(idPokemon.trim()))
            .map((id_pokemon: number) => {
                return {
                    id_pokemon,
                    id_trainer
                }
            });*/

        await connection('pokemon_trainer')
            .insert({ id_trainer, id_pokemon });
        
        return res.json({ id: id_trainer });
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const response =  await connection('pokemon_trainer')
            .select('*')
            .where('pokemon_trainer.id_trainer', id)
        
        
        return res.json(response)
    },
    async updateName(req: Request, res: Response) {
        const { pokemonName, pokemonId, trainerId } = req.body;
    
        await connection('nickname_pokemon')
            .update('nickname', pokemonName)
            .where('id_pokemon', pokemonId)
            .where('id_trainer', trainerId);

        return res.json({ message: `The name ${pokemonName} was updated` });
    }
};

export default addPokemonToTrainer;