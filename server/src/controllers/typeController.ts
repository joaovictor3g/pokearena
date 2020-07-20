import { Request, Response, text } from 'express';
import connection from '../database/connection';
import api from '../services/api';
import axios from 'axios';

interface DataType {
    name: string;
    id_type: number
}

async function getResponse(): Promise<any[]> {
    return await connection('typing').select('id_type');
}

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

        let data: {
            id_pokemon: number,
            id_type: number
        }[] = [];

        const functionWithPromise = async (name: string, url: string) => { //a function that returns a promise
            return await axios.get(url).then(res => {
                data.push({ id_pokemon: Number(id_pokemon), id_type: Number(res.data.id) })
                
                return {
                    id_type: res.data.id,
                    name,
                }
            })
        }


        const anAsyncFunction = async (name: string, url: string) => {
          return functionWithPromise(name, url)
        }
        
        const getData = async (): Promise<any[]> => {
          return Promise.all(getTypes.map((type: { name: string, url: string }) => anAsyncFunction(type.name, type.url)))
        }

        let dataParams: DataType[] = [];

        dataParams = await getData();

        const names = dataParams.map((type: { name: string }) => type.name);
        
        const ids = dataParams.map((type: { id_type: number }) => type.id_type);

        const idsPokemon = data.map((data: { id_pokemon: number }) => data.id_pokemon)

        names.map(async (name: string, idx: number) => {
            const isAlreadyExists = await trx('typing').select('name');
                
            const result = isAlreadyExists.map((type: { name: string }) => type.name);

            if(!result.includes(name)) {
                await trx('typing').insert(dataParams[idx]);
        
            }
        })

        const typeAdded = await getResponse();

        try {
            const resultTypeAdded = typeAdded.map((type: { id_type: number }) => type.id_type);
            let newData: {
                id_pokemon: number,
                id_type: number
            }[] = [];
            for(var i = data.length-1; i >= 0; i--) {
                newData.push(data[i]); 
            }   

            ids.map(async(id: number, idx: number) => {
                if(!typeAdded || resultTypeAdded.includes(id)) {
                    try {
                        await connection('pokemon_type').insert(newData[idx]);
                        
                    
                    }catch(err) {
                        console.log('erro')
                    }
                }
            
            })
        } catch(err) {
            console.log('erro 1')
        }
    
        await trx.commit();

        return res.json({ message: 'deu certo' });

    },
};

export default typeController; 