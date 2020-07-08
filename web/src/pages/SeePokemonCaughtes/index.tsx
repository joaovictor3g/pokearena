import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiTrash2 } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';

import Header from '../../components/Header';
import DeletePokemon from '../../components/DeletePokemon';
import ModalUpdatePokemon from '../../components/ModalUpdatePokemon';

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

    const [isUpdate, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        api.get(`/see-your-pokemons/${id}`)
            .then(res => setPokemons(res.data))

    }, [pokemons, id]);

    function handleDeletePokemon(id_pokemon: number, name: string) {
        setDelete(true);

        setIdPokemon(id_pokemon);
        setNamePokemon(name);
    }

    function handleUpdatePokemon(idPokemon: number, name: string) {
        setUpdate(true);
        setIdPokemon(idPokemon);
        setNamePokemon(name);
    }

    return (
        <>      
            <Header title="Veja os Pokemons que você capturou" id_trainer={id}/>
            <div className="your-pokemons-content">
                {pokemons.map((pokemon: Props) => (
                    <div key={pokemon.id_pokemon} className="content-pokemons">
                        <div className="trash-and-id">                                                                                                                                      
                            <p className="id">{pokemon.id_pokemon}</p>
                            <p className="name">{pokemon.name}</p>
                            <div className="edit-pokemon">
                                <button className="btn" onClick={() => handleDeletePokemon(pokemon.id_pokemon, pokemon.name)}>
                                    <FiTrash2 size={22} color="#8c8c8c"/>
                                </button>
                                <button className="btn" onClick={() => handleUpdatePokemon(pokemon.id_pokemon, pokemon.name)}>
                                    <FaEdit size={22} color="#8c8c8c" />
                                </button>
                            </div>
                        </div>
            
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

                        {isUpdate ?
                            <ModalUpdatePokemon 
                                pokemonName={namePokemon} 
                                pokemonId={id}
                                onClose={() => setUpdate(false)}
                            /> : 
                        null}                                                                                                                                                                                                                                                          
                  </div>
                ))}
            </div>
        </>
    );
};

export default SeePokemonCaughtes;