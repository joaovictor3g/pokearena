import React from 'react';
import { MdCancel } from 'react-icons/md';
import './styles.css'

interface Props {
    name: string;
    effect: string;
    id_ability?: number;
    onClose: () => void;
    pokemonName: string
}

const ModalViewAbilities: React.FC<Props> = ({ name, effect, onClose, pokemonName }) => {
    // Primeira letra maiuscula
    function capitalizeFirstLetter (string: string | undefined) {
        if(string)
            return string.charAt(0).toUpperCase() + string.slice(1);
        
    }

    return (
        <div className="modal-view-abilities">
            <div className="name-and-cancel">
                <span className="name-pokemon">{capitalizeFirstLetter(pokemonName)}</span>
                <span className="name">{capitalizeFirstLetter(name)}</span>
                <button onClick={onClose} className="button-exit">
                <MdCancel size={22} />
              </button>
            </div>
            <span className="effect">{effect}</span>
        </div>
    );
}

export default ModalViewAbilities;