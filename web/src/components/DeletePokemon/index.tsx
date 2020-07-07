import React, { MouseEvent } from 'react';
import api from '../../services/api';
import {MdCancel } from 'react-icons/md';
import './styles.css';

interface Props {
    id_pokemon: number,
    id_trainer: number,
    name: string,
    onClose: () => void
}

const DeletePokemon: React.FC<Props> = ({ id_pokemon, id_trainer, name, onClose }) => {
    
    async function deletePokemon(e: MouseEvent<HTMLButtonElement>) {
        try { 
            const response = await api.delete(`/delete?id_trainer=${id_trainer}&id_pokemon=${id_pokemon}`);

            if(!response.data) {
                alert('Exclusão não concluída');
                onClose();
                return;
            }
            alert('Exclusão com sucesso');
            onClose();
            
        } catch(err) {}
        
    }

    return (
        <>
        
        <div className="delete-modal">
            <button className="btn-1" onClick={onClose}>
                <MdCancel size={22}/>
            </button>
            <div className="container-delete">
                <span>Tem certeza que quer excluir {name} da lista?</span>
                <button type="button" className="btn-confirm" onClick={deletePokemon}>Exluir Pokemon</button>
            </div>
        </div>
        </>
    );
}

export default DeletePokemon;