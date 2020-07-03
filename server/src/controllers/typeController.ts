import { Request, Response } from 'express';
import connection from '../database/connection';
import api from '../services/api';
import axios from 'axios';

const typeController = {
    async create(req: Request, res: Response) {
        const { id_pokemon } = req.params;

        const response = await api.get(`/pokemon/${id_pokemon}`);

        const types = response.data.types.map((type: { type: { name: string } }) => type.type.name);

        const urls: string[] = response.data.types.map((type: { type: { url: string } }) => type.type.url);

        const trx = await connection.transaction();

        const idTypeAlreadyExists = await trx('type').select('id_type');

        const idsType = idTypeAlreadyExists.map((id_type: { id_type: number }) => id_type.id_type);

        const idPokemonAlreadyExists = await trx('pokemon_type').select('id_pokemon');

        const idsPokemons = idPokemonAlreadyExists.map((idPoke: { id_pokemon: any}) => idPoke.id_pokemon)

        urls.map(async(url: string, idx: number) => {
            const urlResponse = await axios.get(url);

            const id_type = urlResponse.data.id;  

            console.log(id_type);

            try {
                if(!idsType.includes(id_type))
                    await trx('type').insert({ id_type, name: types[idx] });

                if( !idsPokemons.includes(id_pokemon+1000))
                    await trx('pokemon_type').insert({ id_pokemon, id_type });

                await trx.commit();

            } catch(err) {
                console.log('Deu erro');
            }
            
        });
        
        return res.json({ message: 'type added' })
    },
};

export default typeController; 