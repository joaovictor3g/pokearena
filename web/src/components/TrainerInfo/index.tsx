import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';

import ImageProfile from '../../assets/image_profile.jpeg'

interface Props {
    name: string,
    id_trainer: number,
    is_online: boolean,
    onClose?: () => void
}

interface ImageProp {
    image: string
}

const TrainerInfo: React.FC<Props> = ({ name, id_trainer, is_online }) => {
    const [image_profile, setImage] = useState<ImageProp>();
    const [pokemons, setPokemons] = useState<[]>();
    
    useEffect(() => {
        api.get(`/get-all-infos/${id_trainer}`)
            .then(res => {
               setImage(res.data[0]);
            })
    }, [id_trainer]);

    async function getInfos() {
        const response = await api.get(`/see-your-pokemons/${id_trainer}`);

        setPokemons(response.data);
    }

    useEffect(() => {
        getInfos();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_trainer]);

    return (
        <div className={`trainer-info-container-modal ${is_online}`}>
            <p className="name">{name}</p>
            <img className="image-profile" src={image_profile?.image ? `http://192.168.0.106:3333/uploads/${image_profile?.image}` : ImageProfile} alt="profile"/>
            <div className="pokemons-content">
                <h2 className="title">Pokemons de {name}</h2>
                {pokemons? 
                    pokemons.map((pokemon: ImageProp) => (
                        <img src={pokemon.image} alt="pokemon" className="listed-pokemons"/>
                    )) : 
                    <p>{name} não capturou nenhum pokemon</p>}
            </div>
        </div>
    );
}

export default TrainerInfo;