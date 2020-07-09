import React, { useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

import PokeInfo from '../../components/PokeInfo';

const Logged = () => {
    const [pokemons, setPokemons] = useState<[]>([]);
    
    const [pages, setPages] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const [isPokeInfoVisbile, setPokeInfoVisible] = useState<boolean>(false);
    const [pokedexNumber, setPokedexNumber] = useState<number>(1);
    const [description, setDescription] = useState<string>('');
    const [pokemonName, setPokemonName] = useState<string>('');

    useEffect(() => {
        getResponsePokemon();
    }, []);

    async function getResponsePokemon(offset=0) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=5`);

        setPokemons(response.data.results);
        setCount(response.data.count);
    }

    // Primeira letra maiuscula
    function capitalizeFirstLetter (string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    function nextPage (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
    
        if (pages === count) {
          return
        }
    
        setPages(pages + 5)
    
        getResponsePokemon(pages + 5)
    }
    
    // Função de paginação anterior
    function goToPreviousPage (e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
  
      if (pages <= 0) { return }
  
      setPages(pages - 5)
  
      getResponsePokemon(pages - 5)
    }

    function handlePokeInfoVisible(idx: number, name: string) {
      setPokeInfoVisible(true);
      setPokedexNumber(idx);
      setPokemonName(name)
    }

    return (
        <>    
            <header className="header">Capture seus pokemons</header>
            
            <div className="container-all">
                <Link to={`/see-your-pokemons/${sessionStorage.getItem('id_trainer')}`} className="link-to-see-pokemons">
                    Capturou algum? Veja seus pokemos já capturados.
                </Link>
                <Link to={`/edit-profile/${sessionStorage.getItem('id_trainer')}`}>
                  Editar perfil
                </Link>
                <table className="table-container">
                <tbody>
                    <tr className="initial-tr">
                      <td>ID</td>
                      <td>Nome</td>
                      <td></td>
                      <td></td>

                    </tr>
                    {pokemons.map((pokemon: { name: string }, index: number) => (
                      <tr key={index + 1}>
                        <td className="id-td">{index + 1 + pages}</td>
                        <td className="td-name">{capitalizeFirstLetter(pokemon.name)}</td>
                        <td className="image-td">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1+pages}.png`}
                            alt="pokemon"
                          />
                        </td>
                    
                        <td className="actions-column">
                          
                          <button onClick={() => handlePokeInfoVisible(index+1+pages, pokemon.name)} className="btn-2">
                                Capturar
                          </button>

                          {isPokeInfoVisbile ? 
                            <PokeInfo 
                              pokedexNumber={pokedexNumber}
                              name={pokemonName}
                              setDescription={setDescription}
                              onClose={()=>setPokeInfoVisible(false)}
                            /> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  
                </table>
                <button onClick={goToPreviousPage} className="next">Anterior</button>
                <button onClick={nextPage} className="previous" >Proximo</button>
            </div>
        </>
    );
};

export default Logged;