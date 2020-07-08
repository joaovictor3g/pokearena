import React from 'react';
import './styles.css';

interface PropsAlert {
    message: string
}

const Alert: React.FC<PropsAlert> = ({ message }) => {
  return (
      <div className="alert-container">
          <span>{message}</span>
      </div>
  );
}

export default Alert;