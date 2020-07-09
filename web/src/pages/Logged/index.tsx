import React, { useEffect, useState, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { FiPower } from 'react-icons/fi';

import './styles.css';

import PokeInfo from '../../components/PokeInfo';
import ImageProfile from '../../assets/image_profile.jpeg'
import api from '../../services/api';

interface ImageProp {
  image: string
}

const Logged = () => {
    const [pokemons, setPokemons] = useState<[]>([]);
    const history = useHistory();
    
    const [pages, setPages] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const [isPokeInfoVisbile, setPokeInfoVisible] = useState<boolean>(false);
    const [pokedexNumber, setPokedexNumber] = useState<number>(1);
    const [description, setDescription] = useState<string>('');
    const [pokemonName, setPokemonName] = useState<string>('');

    const [image_profile, setImage] = useState<ImageProp>();

    useEffect(() => {
        getResponsePokemon();
    }, []);

    useEffect(() => {
      const id = sessionStorage.getItem('id_trainer');

      console.log(id)

      async function getAllInfos() {
        try { 
            const res = await api.get(`/get-all-infos/${id}`);

            if(res.data[0]) {
              setImage(res.data[0]);
            
            }
        } catch(err) {}
        
      }

      getAllInfos();
      
    }, [image_profile])

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
            { !pokemons ? <p>Carregando.....</p> : (
                <>
                  <header className="header">
                    Capture seus pokemons
                    <div className="link-and-image-back">
                      <Link to={`/edit-profile/${sessionStorage.getItem('id_trainer')}`}>
                        <img src={image_profile?.image ? `http://192.168.0.106:3333/uploads/${image_profile?.image}` : ImageProfile} alt="profile"/>
                      </Link>
                      <button type="button" onClick={e=>{ 
                        e.preventDefault()
                        sessionStorage.clear(); 
                        history.push('/');
                        }} className="link">
                        <FiPower size={32} color="#000"/>
                      
                      </button>
                    </div>
                  </header>
                  
                  <div className="container-all">
                      <Link to={`/see-your-pokemons/${sessionStorage.getItem('id_trainer')}`} className="link-to-see-pokemons">
                          Capturou algum? Veja seus pokemos já capturados.
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
            )}
        </>
    );
};

export default Logged;