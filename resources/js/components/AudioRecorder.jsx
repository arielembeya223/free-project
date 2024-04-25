import React, { useState, useEffect } from 'react';
//{ placeholder }
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

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    if (audioFile) {
      const formData = new FormData();
      formData.append('audio', audioFile);
      fetch('/votre-url-d-envoi', {
        method: 'POST',
        body: formData
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
        <form onSubmit={handleSubmit} action={audio} method='POST'>
           <input type="hidden" name="_token" value={csrfToken} />
          <input type="file" accept="audio/*" onChange={handleFileChange} hidden/>
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

        input[type="file"] {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder
