import React, { useState, useEffect, MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import { FiArrowRight } from 'react-icons/fi';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import api from '../../services/api';

const Login = () => {
    const [name, setName] = useState<string>('');
    const [password, setPass] = useState<string>('');
    const [counter, setCounter] = useState<number>(0);

    const [changeEye, setChangeEye] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        api.post('/login', { name: 'João Victor D.', password: '1234444' }).then(res => console.log(res.data.id_trainer))
    }, []);

    async function login() {
        const data = { name, password };

        console.log(data);

        const response = await api.post('/login', data);
        
        if(!response)
            return;
        
        const id = response.data.id_trainer;
        
        history.push(`/catch/${id}`);
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
                
            </form>
        </div>
    );
};

export default Login;