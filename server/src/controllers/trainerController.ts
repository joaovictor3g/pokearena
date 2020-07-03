import { Request, Response } from 'express';
import connection from '../database/connection';

const trainerController = {
    async create(req: Request, res: Response) {
        const { name, password } = req.body;
        
        await connection('trainer')
            .insert({ name, password });
        
        return res.json({ message: 'Trainer reached ten years' });
    },

    async signIn(req: Request, res: Response) {
        const { name, password } = req.body;

        const [id] = await connection('trainer')
            .select('id_trainer')
            .where('name', name)
            .where('password', password);
        
        return res.json(id);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const idPokemon = await connection('trainer')
            .join('pokemon_trainer', 'pokemon_trainer.id_trainer', '=', 'trainer.id_trainer')
            .where('trainer.id_trainer', '=', id)
            .select('pokemon_trainer.id_pokemon');

        const result = idPokemon.map(id => id.id_pokemon);

        const infoPokemon = await connection('pokemon')
            .select('*')
            .whereIn('pokemon.id_pokemon', result)
            .distinct();

        return res.json(infoPokemon);   
    },
};

export default trainerController;