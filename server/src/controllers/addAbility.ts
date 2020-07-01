import { Request, Response } from 'express';
import connection from '../database/connection';
import api from '../services/api';
import axios from 'axios';

function getUrls(url: string) {
    return axios.get(url).then(res => res.data.effect_entries[1].effect);
}

function getUrlsAgain(url: string) {
    fetch(url).then(result => console.log(result))
};

function getNumber(url: string) {
    const result = url.split("").filter((n: number) => (Number(n) || n == 0)).join("");
}

const addAbility = {
    async create(req: Request, res: Response) {
        const { id_trainer } = req.params;

        const response = await api.get(`/pokemon/${id_trainer}`);

        const abilities = response.data.abilities;
        
        const names = abilities
            .map((ability: { ability: { name: string } }) => (ability.ability.name));

        const urls = abilities
            .map((ability: { ability: { url: string } }) => (ability.ability.url)); 
        
        const idsAbilities = urls.split("").filter((n: number) => (Number(n) || n == 0)).join("");

        console.log(idsAbilities)

        const urlResponse = await getUrls(urls[1])    
        //const urlResponse = urls.map(async(url: string, idx: number) => await axios.get(url).then(res => res.data));
        console.log(urlResponse);
        //const fcs = await urls.map((url: string) => getUrls(url));
        //console.log(fcs);
    },  
};

export default addAbility;