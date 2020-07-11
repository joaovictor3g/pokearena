import React, { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from 'react';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import './styles.css';
import { type } from 'os';
import api from '../../services/api';

interface Props {
    pokedexNumber: number,
    name: string,
    setDescription: Dispatch<SetStateAction<string>>,
    onClose: () => void
}

const PokeInfo: React.FC<Props> = ({ pokedexNumber, name, setDescription, onClose }) => {
    const [infos, setInfos] = useState<[]>([]);
    const [types, setTypes] = useState<[]>([]);
    const [numberType, setNumberType] = useState<[]>([]);
    const [urlType, setUrlType] = useState<string[]>([]);

    const [uniqueDescription, setUniqueDescription] = useState<string>('');

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`)
            .then(res => {
                setTypes(res.data.types);
                setUrlType(types.map((type: { type: { url: string } }) => type.type.url))
            });
    }, [pokedexNumber, types, urlType]);

    async function getDetail () {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokedexNumber}`)
        const obj: any[] = []
    
        response.data.flavor_text_entries.map((desc: { version: { name: string } }) => (
          obj.push(desc.version.name)
        ))
    
        /* Pegando a primeira descrição em inglês */
        for (var i = 0; i < obj.length; i++) {
          if (response.data.flavor_text_entries[i].language.name === 'en' && response.data.flavor_text_entries[i].version.name === obj[i]) {
            setUniqueDescription(response.data.flavor_text_entries[i].flavor_text)
            setDescription(response.data.flavor_text_entries[i].flavor_text)
            break
          }
        }
    }

    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokedexNumber]);

    async function persistInfos(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const data = { idsPokemon: pokedexNumber };

        const id = sessionStorage.getItem('id_trainer');

        const pokeData = { 
            id_pokemon: pokedexNumber, 
            name, description: uniqueDescription, 
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png` 
        };

        try { 
            await api.post(`/catch-pokemons`, pokeData);

            const pokemonAdded = await api.post(`catch/${id}`, data);

            //await api.post(`/see-infos/${pokedexNumber}`)

            if(!pokemonAdded) {
                alert('Não Capturado');
                return;
            }

            alert('Capturado');
            onClose();

        } catch(err) {

        }

        
    }

    return (
        <div className="container-modal">
            <div className="name-and-cancel-container">
                <h1>{name}</h1>
                <button onClick={onClose}> 
                    <MdCancel color="#000" size={30}/>
                </button> 
            </div>

            <div className="description-image-container">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`} alt="pokemon"/>
                
                <span>{uniqueDescription}</span>
            </div>
            {types.map((type: { type: { name: string } }, idx: number) => (
                <p className={type.type.name} key={idx}>{type.type.name}</p>
            ))}
            <button onClick={persistInfos} className="confim-catching">Confirmar Captura?</button>
        </div>
    );
}

export default PokeInfo;