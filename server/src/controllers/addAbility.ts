import { Request, Response } from 'express';
import connection from '../database/connection';
import api from '../services/api';

const addAbility = {
    async create(req: Request, res: Response) {
        const { id } = req.params;

        const response = await api.get(`/pokemon/${id}`);

        const abilities = response.data.abilities;
        
        const names = abilities
            .map((ability: { ability: { name: string } }) => (
                ability.ability.name
            ));

        const urls = abilities
            .map((ability: { ability: { url: string } }) => (
                ability.ability.url
            ))

        const urlResponse = urls
            .map(async(url: string, idx: number) => {
                const res = await api.get(url);

                console.log(res.data.effect_entries[idx].effect);
            })
    
        console.log(urlResponse);
    
    },  
};

export default addAbility;