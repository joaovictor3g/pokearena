import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';

interface Props { 
    id_trainer: number, 
    name: string, 
    image: string 
}

const ListUsers: React.FC = () => {
    const [allTrainers, setAllTrainers] = useState<[]>([]);

    useEffect(() => {
        api.get('get-all-trainers')
            .then(res => setAllTrainers(res.data));
    }, []);

    return (
        <div>
            {allTrainers.map((trainer: Props) => (
                <div key={trainer.id_trainer}>
                    <p >{trainer.name}</p>
                    <img src={`http://localhost:3333/uploads/${trainer.image}`} alt="trainer" />
                </div>
            ))}
        </div>
    );
};

export default ListUsers;