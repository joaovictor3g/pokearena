import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { IoMdRadioButtonOn } from 'react-icons/io';
import { FaInfoCircle } from 'react-icons/fa';
import './styles.css';

import TrainerInfo from '../../components/TrainerInfo';

interface Props {
    id_trainer: number,
    name: string,
    is_online: boolean
}

const ViewAllTrainers: React.FC = () => {
    const [trainersOn, setTrainersOn] = useState<Props[]>([]);
    const [trainersOff, setTrainersOff] = useState<Props[]>([]);

    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [idTrainer, setId] = useState<number>(0);
    
    useEffect(() => {
       api.get('/get-all-trainers')
        .then(res => {
            setTrainersOn(res.data.trainersOnline);
            setTrainersOff(res.data.trainersOffline)
        })
        .catch(err => console.log(err));
    }, []);

    function handlePassInfos(name: string, id: number) {
        setModalVisible(true)
        setName(name);
        setId(id);
    }

    return (
        <div className="principal-content">
            {trainersOn.map((trainerOn) => (
                <div className="trainer-container trainer-on" key={trainerOn.id_trainer}>
                    <div className="content">
                        <p>{trainerOn.id_trainer}</p>
                        <p>{trainerOn.name}</p>
                        <span>Está online nesse momento</span>
                    </div>
                    <div>
                        <button onClick={() => handlePassInfos(trainerOn.name, trainerOn.id_trainer)} className="info-button">
                            <FaInfoCircle size={25} color="blue" />
                        </button>
                        <IoMdRadioButtonOn size={25} color="green" />
                    </div>
                    {isModalVisible ? <TrainerInfo name={name} id_trainer={idTrainer}  />: null} 
                </div>
               
            ))}

            {trainersOff.map((trainerOff) => (
                <div className="trainer-container trainer-off" key={trainerOff.id_trainer}>
                    <div className="content">
                        <p>{trainerOff.id_trainer}</p>
                        <p>{trainerOff.name}</p>
                        <span>Está offline nesse momento</span>
                    </div>
                    <div>
                        <button onClick={() => setModalVisible(true) } className="info-button">
                            <FaInfoCircle size={25} color="blue" />
                        </button>
                        <IoMdRadioButtonOn size={25} color="red" />
                    </div>
                </div>
            ))}
        </div>

    );
}

export default ViewAllTrainers;