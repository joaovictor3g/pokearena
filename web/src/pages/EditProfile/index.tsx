import React, { useState, useCallback, MouseEvent } from 'react';
import api from '../../services/api';
import Dropzone from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

import { FiUpload } from 'react-icons/fi';
import './styles.css';

const EditProfile: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
  
    const history = useHistory();

    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      const data = new FormData();

      const id_trainer = sessionStorage.getItem('id_trainer');

      if(selectedFile)
        data.append('image', selectedFile);
      
      try {
        const response = await api.post(`/edit-profile/${id_trainer}`, data);

        if(!response.data) {
          alert('Deu erro');
          return;

        }
        alert('Dados atualizados');
        
        history.push(`/catch/${sessionStorage.getItem('id_trainer')}`)

      } catch(err) {}

    }

    return (
      <>
      <Header title="Edite seu avatar" id_trainer={Number(sessionStorage.getItem('id_trainer'))}/>
      <div className="edit-profile">
        <form className="form-data">
        <Dropzone onDrop={
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useCallback(acceptedFiles => {
                    const file = acceptedFiles[0];
                    
                    const fileUrl = URL.createObjectURL(file)
                
                    setSelectedFileUrl(fileUrl);

                    setSelectedFile(file)
            
                }, [])
            }>
                {({ getRootProps, getInputProps }) => (
                    <section className="dropzone">
                        <div {...getRootProps()}>
                          <input {...getInputProps()} accept='images/*'/>
                          { selectedFileUrl
                            ?  <img src={selectedFileUrl} alt="point" />
                            :  (<p>
                                    <FiUpload />
                                    Selecione uma imagem
                                </p>)
                        }

                        </div>
                    </section>
                )}
            </Dropzone>
          <button className="save-button" type="button" onClick={handleSubmit}>Salvar</button>
        </form>
      </div>
      </>
    );
}

export default EditProfile;