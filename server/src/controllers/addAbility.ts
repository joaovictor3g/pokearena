import { Request, Response } from 'express';
import connection from '../database/connection';
import api from '../services/api';
import axios, { AxiosResponse } from 'axios';

interface DATA  { name: string, id_ability: number, effect: string }

async function getResponse(): Promise<any[]> {
    return await connection('ability').select('id_ability');
}


async function verifyIfExists(): Promise<any[]> {
    return await connection('pokemon_abilities').select('*').distinct();
}

const addAbility = {
    async index(req: Request, res: Response) {
        const { id_pokemon } = req.params;

        const idAbilities = await connection('pokemon')
            .join('pokemon_abilities', 'pokemon_abilities.id_pokemon', 'pokemon.id_pokemon')
            .where('pokemon.id_pokemon', id_pokemon)
            .select('pokemon_abilities.id_ability');
        
        return res.json(idAbilities);
    },
    
    async create(req: Request, res: Response) {
        const { id_pokemon } = req.params;

        const response = await api.get(`/pokemon/${id_pokemon}`);

        const getAbilities = response.data.abilities.map((ability: { ability: { name: string, url: string }}) => { 
            return {
                name: ability.ability.name,
                url: ability.ability.url
            } 
        });

        const trx = await connection.transaction();

        let data: {
            id_pokemon: number,
            id_ability: number
        }[] = [];

        const functionWithPromise = async (name: string, url: string) => { //a function that returns a promise
            return await axios.get(url).then(res => {
                data.push({ id_pokemon: Number(id_pokemon), id_ability: Number(res.data.id) })
                
                return {
                    id_ability: res.data.id,
                    name,
                    effect: res.data.effect_entries[1].effect
                }
            })
        }


        const anAsyncFunction = async (name: string, url: string) => {
          return functionWithPromise(name, url)
        }
        
        const getData = async (): Promise<any[]> => {
          return Promise.all(getAbilities.map((ability: { name: string, url: string }) => anAsyncFunction(ability.name, ability.url)))
        }

        let dataParams: DATA[] = [];

        dataParams = await getData()

        // console.log(data);

        const names = dataParams.map((ability: { name: string }) => ability.name);
        
        const ids = dataParams.map((ability: { id_ability: number }) => ability.id_ability);

        const idsPokemon = data.map((data: { id_pokemon: number }) => data.id_pokemon)

        names.map(async (name: string, idx: number) => {
            const isAlreadyExists = await trx('ability').select('name');
                
            const result = isAlreadyExists.map((ability: { name: string }) => ability.name);

            if(!result.includes(name)) {
                await trx('ability').insert(dataParams[idx]);
        
            }
        })

        const abilityAdded = await getResponse();

        try {
            const resultAbilityAdded = abilityAdded.map((ability: { id_ability: number }) => ability.id_ability);
            let newData: {
                id_pokemon: number,
                id_ability: number
            }[] = [];
            for(var i = data.length-1; i >= 0; i--) {
                newData.push(data[i]); 
            }   

            ids.map(async(id: number, idx: number) => {
                if(!abilityAdded || resultAbilityAdded.includes(id)) {
                    try {
                        await connection('pokemon_abilities').insert(newData[idx]);
                        
                    
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

export default addAbility;