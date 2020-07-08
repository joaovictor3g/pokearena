import React, { useState, useEffect, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import { FiArrowRight } from 'react-icons/fi';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import ModalForgotPassword from '../../components/ModalForgotPassword';
import api from '../../services/api';

const Login = () => {
    const [name, setName] = useState<string>('');
    const [password, setPass] = useState<string>('');
    const [counter, setCounter] = useState<number>(0);

    const [changeEye, setChangeEye] = useState<boolean>(false);
    const history = useHistory();

    // Modal de esquecer a senha visivel
    const [isNewPasswordModalVisible, setPasswordModalVisible] = useState<boolean>(false);

    async function login(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const data = { name, password };

        try {
            const response = await api.post('/login', data);
        
            if(!response.data) {
                alert('Usuário e/ou senha incorretos');
                return;

            }
            
            const id = response.data.id_trainer;

            sessionStorage.setItem('id_trainer', id);
            
            history.push(`/catch/${id}`);
        } catch (err) {

        }

    }

    function handleClickVisibleButton(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCounter(counter+1);

        counter%2===0 ? setChangeEye(true) : setChangeEye(false);
    }

    return (
        <div className="container">
            
            <form className="form-content" >
                <input 
                    className="input-content"
                    placeholder="Usuário"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <div className="input-and-symbol">
                    <input 
                        className="input-content-two"  
                        placeholder="Senha"
                        value={password}
                        onChange={e=>setPass(e.target.value)}
                        type={changeEye ? 'text' : 'password'}
                    />
                    <button onClick={handleClickVisibleButton}>
                        {changeEye ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                <Link to="/sign-up" className="sign-up">
                    Não tem cadastro? Cadastrar novo usuário
                    <FiArrowRight />
                </Link>

                <button type="button" className="button" onClick={login}>
                    Login
                </button>

                <button onClick={(e) => {
                    e.preventDefault();
                    setPasswordModalVisible(true);
                }}>
                        Esqueceu a senha?
                </button>
                {isNewPasswordModalVisible ? <ModalForgotPassword onClose={()=>setPasswordModalVisible(false)}/>: null} 
                
            </form>
              
        </div>
    );
};

export default Login;