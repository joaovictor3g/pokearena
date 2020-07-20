import { Request, Response } from 'express';
import connection from '../database/connection';

const trainerController = {
    // Cria um novo treinador
    async create(req: Request, res: Response) {
        const { name, password } = req.body;

        await connection('trainer')
            .insert({ name, password, is_online: false });
        
        return res.json({ message: 'Trainer reached ten years' });
    },

    // Verifica se o treinador existe na base de dados
    async signIn(req: Request, res: Response) {
        const { name, password } = req.body;

        const trx = await connection.transaction();

        const [id] = await trx('trainer')
            .select('id_trainer')
            .where('name', name)
            .where('password', password);
        
        if(id) {
            await trx('trainer')
             .update('is_online', true)
             .where('id_trainer', Number(id.id_trainer)) 
        }
        await trx.commit();

        return res.json(id);
    },

    async exit(req: Request, res: Response) {
        const { id } = req.params;

        await connection('trainer')
            .update('is_online', false)
            .where('id_trainer', id);
        
        return res.json({ message: 'exited with success' })
    },

    // Mostra os pokemons que o treinador capturou
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const idPokemon = await connection('trainer')
            .join('pokemon_trainer', 'pokemon_trainer.id_trainer', '=', 'trainer.id_trainer')
            .where('trainer.id_trainer', '=', id)
            .select('pokemon_trainer.id_pokemon');

        const result = idPokemon.map(id => id.id_pokemon);

        const infoPokemon = await connection('pokemon')
            .join('nickname_pokemon', 'nickname_pokemon.id_pokemon', 'pokemon.id_pokemon')
            .whereIn('pokemon.id_pokemon', result)
            .where('nickname_pokemon.id_trainer', id)
            .select('nickname_pokemon.nickname', 'pokemon.*')
            .orderBy('id_pokemon')
            .distinct();
        
        const abilityPokemon = await connection('pokemon')
            .join('pokemon_abilities', 'pokemon_abilities.id_pokemon', 'pokemon.id_pokemon')
            .whereIn('pokemon.id_pokemon', result)
            .select('pokemon_abilities.id_ability');

        const serializedPokemons = abilityPokemon.map((id: { id_ability: number }) => id.id_ability );

        const abilities = await connection('ability')
            .join('pokemon_abilities', 'pokemon_abilities.id_ability', 'ability.id_ability')
            .whereIn('ability.id_ability', serializedPokemons)
            .select('*');

        return res.json({ infoPokemon, abilities });
    },

    // Deleta um pokemon do treinador
    async deletePokemon(req: Request, res: Response) {
        const { id_trainer, id_pokemon } = req.query;
        
        const idTrainer = Number(id_trainer);
        const idPokemon = Number(id_pokemon);

        await connection('pokemon_trainer')
            .where('id_trainer', idTrainer)
            .where('id_pokemon', idPokemon)
            .del();

        return res.json({ message: 'Pokemon deleted' })
    },

    // Atualiza senha de acesso do treinador (sem interface)
    async updatePassword(req: Request, res: Response) {
        const { id_trainer, name, password } = req.body;

        await connection('trainer')
            .update('name', name)
            .update('password', password)
            .where('id_trainer', id_trainer);

        return res.json({ message: 'Update was done!!!' })
    
    },

    // Adiciona uma imagem de avatar para o treinador
    async addImageProfile(req: Request, res: Response) {
        const { id } = req.params;

        const trx = await connection.transaction();

        const response = await trx('trainer_image').select('id_trainer');

        const result = response.map((id_trainer: {id_trainer: number})=>id_trainer.id_trainer);

        if(!result.includes(Number(id))) {
            await connection('trainer_image').insert({ id_trainer: id, image: req.file.filename });

            return res.json({ message: 'Alright' })
        }

        await connection('trainer_image')
            .update('image', req.file.filename)
            .where('id_trainer', id);
            
        //await trx.commit();

        return res.json({ message: 'Updated' })
    },

    // Retorna imagem e nome do treinador
    async getAllInfos(req: Request, res: Response) {
        const { id } = req.params;

        const response = await connection('trainer')
            .join('trainer_image', 'trainer_image.id_trainer', 'trainer.id_trainer')
            .where('trainer.id_trainer', '=', id)
            .select('trainer_image.image', 'trainer.name')
            .distinct();
        
        return res.json(response)
    },

    // Retorna todos os treinadores criados
    async returnAllTrainers(req: Request, res: Response) {

        const trainersOnline = await connection('trainer')
            .select('name', 'id_trainer', 'is_online')
            .where('is_online', true)
            .orderBy('id_trainer');
        
        const trainersOffline = await connection('trainer')
            .select('name', 'id_trainer', 'is_online')
            .where('is_online', false)
            .orderBy('id_trainer');

        return res.json({ trainersOnline, trainersOffline });
    },

    
}; 

export default trainerController;