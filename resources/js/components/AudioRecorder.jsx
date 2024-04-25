import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assurez-vous d'importer axios si vous ne l'avez pas déjà fait

const AudioRecorder = ({ audio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

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
      .catch(error => console.error('Error accessing media devices: ', error));
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

  const handleSubmit = () => {
    if (audioFile) {
      fetch(audio, {
        method: 'POST',
        body: audioFile,
        headers: {
          'Content-Type': 'audio/mp3',
          'X-CSRF-Token': csrfToken,
        },
      })
      .then(response => {
        // Gérer la réponse de l'envoi
      })
      .catch(error => {
        console.error('Error sending audio:', error);
      });
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
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_token" value={csrfToken} />
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
