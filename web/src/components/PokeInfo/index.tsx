import React from 'react';
import { MdCancel } from 'react-icons/md';
import './styles.css';

interface Props {
    pokedexNumber: number,
    name: string,
}

const PokeInfo: React.FC<Props> = ({ pokedexNumber, name }) => {
  return (
      <div className="container-modal">
          <MdCancel color="#000"/>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`} alt="pokemon"/>
      </div>
  );
}

export default PokeInfo;