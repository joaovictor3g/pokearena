import { Request, Response } from 'express';
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

        //return res.json(getTypes);

        const trx = await connection.transaction();

        const isAlreadyExists = await connection('type').select('name');

        const result = isAlreadyExists.map((type: { name: string }) => type.name);

        getTypes.map(async(type: { name: string, url: string }) => {
            const res = await axios.get(type.url);

            if(!result.includes(type.name)) {
                await trx('type').insert({ name: type.name, id_type: res.data.id });
                
            }
            await trx('pokemon_type').insert({ id_pokemon, id_type: res.data.id });

            await trx.commit();
        })

        return res.json({ message: 'deu certo' })
    },
};

export default typeController; 