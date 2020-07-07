import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import id_trainer from '../../utils/id_trainer';
import { FiTrash2, FiPower } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import DeletePokemon from '../../components/DeletePokemon';
import './styles.css';

interface Props { 
    name: string, 
    id_pokemon: number, 
    image: string, 
    description: string 
};

const SeePokemonCaughtes: React.FC = () => {
    const [pokemons, setPokemons] = useState<[]>([]);

    const id = Number(sessionStorage.getItem('id_trainer'));
    const [isdeleted, setDelete] = useState<boolean>(false);

    const [idPokemon, setIdPokemon] = useState<number>(0);
    const [namePokemon, setNamePokemon] = useState<string>('');

    useEffect(() => {
        api.get(`/see-your-pokemons/${id}`)
            .then(res => setPokemons(res.data))

    }, [pokemons, id]);

    function handleDeletePokemon(id_pokemon: number, name: string) {
        setDelete(true);

        setIdPokemon(id_pokemon);
        setNamePokemon(name);
    }

    return (
        <>
            <Link onClick={()=>{sessionStorage.clear()}} to="/" className="go-home-button">
                <FiPower size={22} />
            </Link>
            <div className="your-pokemons-content">
                {pokemons.map((pokemon: Props) => (
                    <div key={pokemon.id_pokemon} className="content-pokemons">
                        <div className="trash-and-id">                                                                                                                                      
                            <p className="id">{pokemon.id_pokemon}</p>
                            <button className="btn" onClick={() => handleDeletePokemon(pokemon.id_pokemon, pokemon.name)}>
                                <FiTrash2 size={22} color="#8c8c8c"/>
                            </button>
                        </div>
                        <p className="name">{pokemon.name}</p>
                        <img src={pokemon.image} alt="pokemon" />
                        <span className="description">{pokemon.description}</span>

                        {isdeleted ?                                                        
                            <DeletePokemon 
                                name={namePokemon} 
                                id_pokemon={idPokemon} 
                                id_trainer={id} 
                                onClose={() => setDelete(false)}
                            /> : 
                        null}                                                                                                                                                                                                                                                           
                  </div>
                ))}
            </div>
        </>
    );
};

export default SeePokemonCaughtes;