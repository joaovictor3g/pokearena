import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiTrash2 } from 'react-icons/fi';
import { FaEdit, FaQuestion } from 'react-icons/fa';

import Header from '../../components/Header';
import DeletePokemon from '../../components/DeletePokemon';
import ModalUpdatePokemon from '../../components/ModalUpdatePokemon';
// import Alert from '../../components/Alert';

import './styles.css';

interface Props { 
    name: string, 
    nickname?: string,
    id_pokemon: number, 
    image: string, 
    description: string
}

interface AbilityProps {
    name: string;
    id_pokemon: number
    effect: string;
    id_ability: number;
}

interface TypeProps {
    name: string;
    id_type: number;
    id_pokemon: number;
}

const SeePokemonCaughtes: React.FC = () => {
    const [pokemons, setPokemons] = useState<[]>([]);
    const [abilties, setAbilities] = useState<[]>([]);
    const [types, setTypes] = useState<[]>([]);

    const id = Number(sessionStorage.getItem('id_trainer'));
    const [isdeleted, setDelete] = useState<boolean>(false);

    const [idPokemon, setIdPokemon] = useState<number>(0);
    const [namePokemon, setNamePokemon] = useState<string>('');

    const [isUpdate, setUpdate] = useState<boolean>(false);

    const [isSubmited, setSubmited] = useState<boolean>(false);
    

    async function getInfos() {
        const response = await api.get(`/see-your-pokemons/${id}`);

        // console.log(response.data);

        setPokemons(response.data.infoPokemon);
        setAbilities(response.data.abilities)
        setTypes(response.data.types)
    }

    useEffect(() => {
        getInfos();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemons, id]);

    function handleDeletePokemon(id_pokemon: number, name: string) {
        setDelete(true);

        setIdPokemon(id_pokemon);
        setNamePokemon(name);
        setSubmited(true);
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
                {pokemons.map((pokemon: Props, idx: number) => (
                    <div key={idx} className="content-pokemons">
                        <div className="trash-and-id">                                                                                                                                      
                            <p className="id">{pokemon.id_pokemon}</p>
                            <p className="name">{pokemon.nickname  || pokemon.name}</p>
                            <div className="edit-pokemon">
                                <button className="btn" onClick={() => handleDeletePokemon(pokemon.id_pokemon, (pokemon.nickname || pokemon.name))}>
                                    <FiTrash2 size={22} color="#8c8c8c"/>
                                </button>
                                <button className="btn" onClick={() => handleUpdatePokemon(pokemon.id_pokemon, (pokemon.nickname || pokemon.name))}>
                                    <FaEdit size={22} color="#8c8c8c" />
                                </button>
                                
                            </div>
                        </div>
                        <div className="image-and-abilities">
                            <img src={pokemon.image} alt="pokemon" />
                            <div className="abilities-and-types">
                                {types.map((type: TypeProps) => (
                                    pokemon.id_pokemon===type.id_pokemon ?
                                        <p className={type.name} key={type.id_type}>{type.name}</p>: null
                                ))}
                                <div className="abilities-container">
                                    {abilties.map((ability: AbilityProps) => (
                                        (pokemon.id_pokemon===ability.id_pokemon)?(
                                            <div key={ability.id_ability}>
                                            <span >{ability.name}</span>
                                            <button className="ability-content">
                                                <FaQuestion color="#FFF" size={14}/>
                                            </button>
                                            </div>
                                            ): null
                                        
                                    ))}
                                </div>
                            </div>
                        </div>        

                            
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
                                pokemonId={idPokemon}
                                onClose={() => setUpdate(false)}
                                id_trainer={id}
                            /> : 
                        null}   

                                                                                                                                                                                                                                                                            
                  </div>
                ))}
            </div>
        </>
    );
};

export default SeePokemonCaughtes;