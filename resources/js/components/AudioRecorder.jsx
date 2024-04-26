import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioRecorder = ({ audio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération du token CSRF
        const csrfResponse = await axios.get('/csrf-token');
        setCsrfToken(csrfResponse.data.csrf_token);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = handleDataAvailable;
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      })
      .catch(error => console.error('Erreur lors de l\'accès aux périphériques multimédias: ', error));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    const blob = new Blob([event.data], { type: 'audio/mp3' });
    setAudioURL(URL.createObjectURL(blob));
    setAudioFile(blob);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectedAudioFile = (event) => {
    setSelectedAudioFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    
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
        // Gérer la réponse de l'envoi
        // Si tout va bien, soumettre le formulaire manuellement
        document.getElementById('audioForm').submit();
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'audio:', error);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center my-4 mb-5">
      <div id="audioplayer">
        {!audioURL && (
          <div>
            {!isRecording ? (
              <button onClick={startRecording} type="button">
                Start Recording
              </button>
            ) : (
              <button onClick={stopRecording} type="button" style={{ backgroundColor: '#ff6347' }}>
                Stop Recording
              </button>
            )}
          </div>
        )}
        {audioURL && (
          <div>
            <audio controls src={audioURL}></audio>
          </div>
        )}
      </div>
      {audioURL && (
        <form id="audioForm" action={audio} method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="hidden" name="_token" value={csrfToken} />
          <input type="file" name="audio"  onChange={handleSelectedAudioFile} />
          <button type="submit">Envoyer</button>
        </form>
      )}
      <style>{`
        button {
          margin-right: 10px;
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

        #audioplayer {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder;
