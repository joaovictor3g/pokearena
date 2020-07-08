import React, { useState, MouseEvent, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';

import './styles.css';
import api from '../../services/api';
interface Props {
    pokemonName: string,
    pokemonId: number,
    onClose: () => void,
    id_trainer: number
}

const ModalUpdatePokemon: React.FC<Props> = ({ pokemonName, pokemonId, onClose, id_trainer }) => {
    const [nickname, setNickname] = useState<string>('');

    useEffect(() => {}, [nickname])

    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const data = { pokemonName: nickname, pokemonId, trainerId: id_trainer };

        try {
            const response = await api.put("/update-pokemon", data);

            if(!response.data) {
                alert('Pokemon não atualizado');
                return;
            }

            alert('Pokemon atualizado')
        } catch(err) {
        }
    }
    
    return (
        <>
        <div className="modal-update-container">
            <button className="exit" onClick={onClose}>
                <MdCancel size={22}/>
            </button>
            <div className="space-between">
                <input 
                    className="change-name" 
                    placeholder={`Digite um 'apelido' para ${pokemonName}`}
                    onChange={e => setNickname(e.target.value)}
                    value={nickname}
                />
                <button onClick={handleSubmit} className="update">Atualizar apelido</button>
            </div>
        </div>
        </>
    );
}

export default ModalUpdatePokemon;