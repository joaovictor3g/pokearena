import { Request, Response, text } from 'express';
import connection from '../database/connection';
import api from '../services/api';
import axios from 'axios';

const typeController = {
    async create(req: Request, res: Response) {
        const { id_pokemon } = req.params;

        const response = await api.get(`/pokemon/${id_pokemon}`);

        const getTypes = response.data.types.map((type: { type: { name: string, url: string }}) => { 
            return {
                name: type.type.name,
                url: type.type.url
            } 
        });

        const trx = await connection.transaction();

        const isAlreadyExists = await trx('typing').select('name');

        const result = isAlreadyExists.map((type: { name: string }) => type.name);

        const isIdPokemon = await trx('pokemon_type').select('*');

        const validateIds = isIdPokemon.map((id: { id_pokemon: number, id_type: number }) => {
            return {
                idPokemon: id.id_pokemon,
                idType: id.id_type
            }
        })

        getTypes.map(async(type: { name: string, url: string }) => {
            const res = await axios.get(type.url);

            if(!result.includes(type.name)) {
                await trx('typing').insert({ name: type.name, id_type: res.data.id });
                
            }

            if(!validateIds.includes(id_pokemon && res.data.id))
                await trx('pokemon_type').insert({ id_pokemon, id_type: res.data.id });

            await trx.commit();
        })

        return res.json({ message: 'deu certo' })
    },
};

export default typeController; 