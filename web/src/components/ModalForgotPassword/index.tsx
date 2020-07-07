import React from 'react';
import './styles.css';

interface Props {
    onClose: () => void
}

const ModalForgotPassword: React.FC<Props> = ({ onClose }) => {
    return (
        <div className="modal-forgot-password">
            <p>Hello</p>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
}

export default ModalForgotPassword;