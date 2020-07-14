import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';

const ViewAllTrainers: React.FC = () => {
    const [trainers, setTrainers] = useState<[]>([]);
    
    useEffect(() => {
       api.get('/get-all-trainers')
        .then(res => console.log(res.data));
    }, []);

    return (
        <div>Hello</div>
    );
}

export default ViewAllTrainers;