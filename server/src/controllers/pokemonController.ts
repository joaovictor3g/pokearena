import { Request, Response } from 'express';
import connection from '../database/connection';

const pokemonController = {
    async create(req: Request, res: Response){
        const { id_pokemon, name, description, image } = req.body;

        await connection('pokemon')
            .insert({ 
                id_pokemon,
                name,
                description,
                image
            })
        return res.json({ message: 'Pokemon was caught' })
    },
};

export default pokemonController;