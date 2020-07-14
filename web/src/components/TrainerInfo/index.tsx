import React from 'react';
import './styles.css';

interface Props {
    name: string,
    id_trainer: number,
    onClose?: () => void
}

const TrainerInfo: React.FC<Props> = ({ name, id_trainer }) => {
    return (
        <div className="trainer-info-container-modal">
            {name}
        </div>
    );
}

export default TrainerInfo;