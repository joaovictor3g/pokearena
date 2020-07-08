import { Request, Response } from 'express';
import connection from '../database/connection';

const pokemonController = {
    async index(req: Request, res: Response) {
        const allPokemons = await connection('pokemon')
            .select('*');
        
        return res.json(allPokemons);
    },

    async create(req: Request, res: Response){
        const { id_pokemon, name, description, image } = req.body;

        const isPokemonAlreadyExists = await connection('pokemon')
            .select('id_pokemon');

        const idExistants = isPokemonAlreadyExists.map((id_pokemon: { id_pokemon: number }) => id_pokemon.id_pokemon);

        for(var i=0; i <idExistants.length; i++) {
            if(id_pokemon===idExistants[i])
                return res.json({ message: 'Pokemon already caught' });
        }

        await connection('pokemon')
            .insert({ 
                id_pokemon,
                name,
                description,
                image
            })
        return res.json({ message: 'Pokemon was caught' })
    },

    async updateName(req: Request, res: Response) {
        const { pokemonName, pokemonId, trainerId } = req.body;
    
        await connection('pokemon')
            .update('name', pokemonName)
            .where('id_pokemon', pokemonId)

        return res.json({ message: 'Pokemon name updated' });
    }

};

export default pokemonController;