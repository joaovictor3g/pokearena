import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import id_trainer from '../../utils/id_trainer';
import { FiTrash2, FiPower } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import './styles.css';

interface Props { 
    name: string, 
    id_pokemon: number, 
    image: string, 
    description: string 
};

const SeePokemonCaughtes: React.FC = () => {
    const [pokemons, setPokemons] = useState<[]>([]);
    const id = sessionStorage.getItem('id_trainer');

    useEffect(() => {
        api.get(`/see-your-pokemons/${id}`)
            .then(res => setPokemons(res.data))

    }, [pokemons, id]);

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
                            <button>
                                <FiTrash2 size={22} color="#8c8c8c"/>
                            </button>
                        </div>
                        <p className="name">{pokemon.name}</p>
                        <img src={pokemon.image} alt="pokemon" />
                        <span className="description">{pokemon.description}</span>
                  </div>
                ))}
            </div>
        </>
    );
};

export default SeePokemonCaughtes;