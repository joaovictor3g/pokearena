import React from 'react';
import { MdCancel } from 'react-icons/md';

import './styles.css';

interface Props {
    pokemonName: string,
    pokemonId: number,
    onClose: () => void
}

const ModalUpdatePokemon: React.FC<Props> = ({ pokemonName, pokemonId, onClose }) => {
    return (
        <>
        <div className="modal-update-container">
            <button className="exit" onClick={onClose}>
                <MdCancel size={22}/>
            </button>
            <div className="space-between">
                <input className="change-name" placeholder={`Digite um 'apelido' para ${pokemonName}`}/>
                <button className="update">Atualizar apelido</button>
            </div>
        </div>
        </>
    );
}

export default ModalUpdatePokemon;