import { Request, Response } from 'express';
import connection from '../database/connection';

const addPokemonToTrainer = {
    async create(req: Request, res: Response) { 
        const { id } = req.params;
        const { idsPokemon } = req.body;

        const trx = await connection.transaction();

        const id_trainer = Number(id);
        const id_pokemon = Number(idsPokemon);

        await trx('pokemon_trainer')
            .insert({ id_trainer, id_pokemon });

        const [name] = await trx('pokemon')
            .join('pokemon_trainer', 'pokemon_trainer.id_pokemon', 'pokemon.id_pokemon')
            .where('pokemon.id_pokemon', id_pokemon)
            .where('pokemon_trainer.id_trainer', id_trainer)
            .select('pokemon.name');
            

        await trx('nickname_pokemon')
            .insert({ id_trainer, id_pokemon, nickname: name.name })

        await trx.commit();
        
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