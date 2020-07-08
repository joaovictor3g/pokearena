import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiArrowLeft} from 'react-icons/fi';
import './styles.css';

interface HeaderProps {
    title: string,
    onAction?: () => void,
    id_trainer?: number
} 

const Header: React.FC<HeaderProps> = ({ title, id_trainer }) => {
  return (
        <header className="header-content">
            <Link to={`/catch/${id_trainer}`}>
                <FiArrowLeft size={25} color="#FFF"/>
            </Link>
            <p className="title">{title}</p>
            <Link onClick={()=>{sessionStorage.clear()}} to="/" className="go-home-button" >
                <FiPower size={25} color="#FFF"/>    
            </Link>
        </header>
    
    );
}

export default Header;