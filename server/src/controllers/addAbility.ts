import { Request, Response } from 'express';
import connection from '../database/connection';
import api from '../services/api';
import axios from 'axios';

async function getUrls(url: string) {
    const response = await axios.get(url);

    const effect = response.data.effect_entries[1].effect;
    const id = response.data.id;

    return { effect, id };
}

const addAbility = {
    async create(req: Request, res: Response) {
        const { id_trainer } = req.params;

        const response = await api.get(`/pokemon/${id_trainer}`);

        const abilities = response.data.abilities;
        
        const names = abilities
            .map((ability: { ability: { name: string } }) => (ability.ability.name));

        const urls: string[] = abilities
            .map((ability: { ability: { url: string } }) => (ability.ability.url)); 

        urls.map(async(url: string, idx: number) => {
            const response = await getUrls(url);
            
            const effect = response.effect;
            const id_ability = response.id;

            try {
                const data = { id_ability, name: names[idx], effect };

                await connection('ability').insert(data);

                if(idx+1===urls.length)
                    return res.json({ message: 'Ability added' })

            } catch (err) {
                console.log(err);
            }
        });
    
       
    },  
};

export default addAbility;