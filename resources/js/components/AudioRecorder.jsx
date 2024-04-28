import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioRecorder = ({ audio }) => {
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/csrf-token');
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event) => {
    //event.preventDefault();

    if (selectedAudioFile) {
      const formData = new FormData();
      formData.append('audio', selectedAudioFile);
      formData.append('_token', csrfToken);

      try {
        const response = await axios.post(audio, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Réponse de l\'envoi de l\'audio:', response);
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'audio:', error);
      }
    }
  };

  const handleSelectedAudioFile = (event) => {
    setSelectedAudioFile(event.target.files[0]);
  };

  return (
    <div className="container d-flex justify-content-center my-4 mb-5">
      <form onSubmit={handleSubmit}  action={audio} method="POST" encType="multipart/form-data">
        {/* Input de fichier */}
        <label className="custom-file-upload">
          <input type="file" accept='audio/*' name='audio' />
          Sélectionner un fichier audio
        </label>
        {/* Token CSRF */}
        <input type="hidden" name="_token" value={csrfToken} />
        {/* Bouton Envoyer */}
        <button type="submit">Envoyer</button>
      </form>

      <style jsx>{`
        .container {
          text-align: center;
        }
        form {
          margin-top: 20px;
        }
        /* Styles pour le bouton Envoyer */
        button {
          cursor: pointer;
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
        }
        button:hover {
          opacity: 0.8;
        }
        /* Styles pour l'input de fichier personnalisé */
        .custom-file-upload {
          cursor: pointer;
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 20px;
          transition: background-color 0.3s;
        }
        .custom-file-upload:hover {
          background-color: #0056b3;
        }
        .custom-file-upload input {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder;
