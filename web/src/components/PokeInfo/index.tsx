import React, { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from 'react';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import './styles.css';
import api from '../../services/api';

interface Props {
    pokedexNumber: number,
    name: string,
    setDescription?: Dispatch<SetStateAction<string>>,
    onClose: () => void
}

const PokeInfo: React.FC<Props> = ({ pokedexNumber, name, onClose }) => {
    const [types, setTypes] = useState<[]>([]);
    const [textButton, setTextButton] = useState<string>('Confirmar Captura?');
    const [uniqueDescription, setUniqueDescription] = useState<string>('');

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`)
            .then(res => {
                setTypes(res.data.types);
                // setUrlType(types.map((type: { type: { url: string } }) => type.type.url))
            });
    }, [pokedexNumber, types]);

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
            name, 
            description: uniqueDescription, 
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png` 
        };

        try { 
            setTextButton('Carregando....')

            await api.post(`/catch-pokemons`, pokeData);

            const pokemonAdded = await api.post(`catch/${id}`, data);

            const pokedex1 = await api.get(`/add-ability/${pokedexNumber}`);
            
            const pokedex2 = await api.get(`/add-ability/${pokedexNumber}`);

            const type1 = await api.get(`/add-types/${pokedexNumber}`);
            
            const type2 = await api.get(`/add-types/${pokedexNumber}`);

            if(pokemonAdded && pokedex1 && pokedex2 && type1 && type2) {
                alert('Capturado');
                onClose();

            }else {
                alert('Não Capturado');
                return;
            }

        } catch(err) {

        }    
    }

    // Primeira letra maiuscula
    function capitalizeFirstLetter (string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div className="container-modal">
            <div className="name-and-cancel-container">
                <h1>{capitalizeFirstLetter(name)}</h1>
                <button onClick={onClose}> 
                    <MdCancel color="#000" size={30}/>
                </button> 
            </div>

            <div className="description-image-container">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`} alt="pokemon"/>
                
                <span>{uniqueDescription? uniqueDescription: <p>Carregando....</p> }</span>
            </div>
            {types.map((type: { type: { name: string } }, idx: number) => (
                <p className={type.type.name} key={idx}>{capitalizeFirstLetter(type.type.name)}</p>
            ))}
            <button onClick={persistInfos} className="confim-catching">{textButton}</button>
        </div>
    );
}

export default PokeInfo;