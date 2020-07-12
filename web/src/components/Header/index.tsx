import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiArrowLeft} from 'react-icons/fi';
import './styles.css';

interface HeaderProps {
    title: string,
    onAction?: () => void,
    id_trainer?: number, 
    image?: string
} 

const Header: React.FC<HeaderProps> = ({ title, id_trainer }) => {
  return (
        <header className="header-content">
            <div className="back-and-image-content">
                <Link to={`/catch/${id_trainer}`}>
                    <FiArrowLeft size={25} color="#FFF"/>
                </Link>
            </div>
            <p className="title">{title}</p>
            <Link onClick={()=>{sessionStorage.clear()}} to="/" className="go-home-button" >
                <FiPower size={28} color="crimson"/>    
            </Link>
        </header>
    
    );
}

export default Header;