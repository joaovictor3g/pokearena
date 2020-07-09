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

        /*const infoPokemon = await connection('pokemon')
            .select('*')
            .whereIn('pokemon.id_pokemon', result)
            .distinct();*/
        const infoPokemon = await connection('pokemon')
            .join('nickname_pokemon', 'nickname_pokemon.id_pokemon', 'pokemon.id_pokemon')
            .whereIn('pokemon.id_pokemon', result)
            .where('nickname_pokemon.id_trainer', id)
            .select('nickname_pokemon.nickname', 'pokemon.*')
            .distinct();
          
    
        return res.json(infoPokemon);
    },

    async deletePokemon(req: Request, res: Response) {
        //const { id_trainer } = req.params;
        //const { id_pokemon } = req.body;
        const { id_trainer, id_pokemon } = req.query;
        
        const idTrainer = Number(id_trainer);
        const idPokemon = Number(id_pokemon);

        await connection('pokemon_trainer')
            .where('id_trainer', idTrainer)
            .where('id_pokemon', idPokemon)
            .del();

        return res.json({ message: 'Pokemon deleted' })
    },

    async updatePassword(req: Request, res: Response) {
        const { id_trainer, name, password } = req.body;

        await connection('trainer')
            .update('name', name)
            .update('password', password)
            .where('id_trainer', id_trainer);

        return res.json({ message: 'Update was done!!!' })
    
    },

    async addImageProfile(req: Request, res: Response) {
        const { id } = req.params;
        const { password } = req.body;

        const trx = await connection.transaction();

        const response = await trx('trainer_image').select('id_trainer');

        const result = response.map((id_trainer: {id_trainer: number})=>id_trainer.id_trainer);

        if(!result.includes(Number(id))) {
            await trx('trainer_image').insert({ id_trainer: id, image: req.file.filename });

            return res.json({ message: 'Alright' })
        }

        await trx('trainer')
            .update('password', password)
            .where('id_trainer', id);

        await trx('trainer_image')
            .update('image', req.file.filename)
            .where('id_trainer', id);
            
        await trx.commit();

        return res.json({ message: 'Updated' })
    },

    async getAllInfos(req: Request, res: Response) {
        const { id } = req.params;

        const response = await connection('trainer')
            .join('trainer_image', 'trainer_image.id_trainer', 'trainer.id_trainer')
            .where('trainer.id_trainer', '=', id)
            .select('trainer_image.image', 'trainer.name')
            .distinct();
        
        return res.json(response)
    }
}; 

export default trainerController;