import React, { useState, MouseEvent } from 'react';
import api from '../../services/api';

import { useHistory } from 'react-router-dom';
import './styles.css';

import { FiPower } from 'react-icons/fi';

const NewTrainer: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const history = useHistory();

    async function addNewTrainer(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        
        if(password!==confirmPassword) {
            alert('Senhas diferentes, tente novamente...');
            return;
        }

        const data = { name, password };

        try {
            if(!data) 
                return;
            
            const response = await api.post('/', data);

            if(!response) {
                alert('Erro ao inserir novo treinador');
                return;
            }

            alert('Treinador adicionado');
            setName('');
            setPassword('');
            setConfirmPassword('');

        } catch(err) {
            console.log('Deu erro');
        }
    }

    return (
        <>  
            <button onClick={(e) => {
                e.preventDefault();
                history.push('/');
                
            }} className="link-to-home">
                <FiPower size={32} />
            </button>
            <div className="sign-up-to">
              <h1 className="title">Seja Bem Vindo, novo treinador</h1>

              <form className="input-group">
                  <input 
                      placeholder="Digite um usuário"
                      type="text"
                      onChange={e => setName(e.target.value)}
                      value={name}
                  />
                  <input 
                      placeholder="Digite uma senha"
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      value={password}

                  />
                  <input 
                      placeholder="Confirme a senha"
                      type="password"
                      onChange={e => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                  />

                  <button onClick={addNewTrainer}>Cadastrar</button>
              </form>
            </div>
        </>
    );
};

export default NewTrainer;