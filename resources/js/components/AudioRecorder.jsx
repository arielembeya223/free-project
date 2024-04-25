import React, { useState } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const downloadAudio = () => {
    if (audioURL) {
      const downloadLink = document.createElement('a');
      downloadLink.href = audioURL;
      downloadLink.setAttribute('download', 'audio.mp3');
      downloadLink.click();
    }
  };

  return (
    <div className="container d-flex justify-content-center my-4 mb-5">
      <div id="audioplayer">
        {audioURL && (
          <div>
            <i id="pButton" className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} onClick={togglePlay}></i>
            <div id="timeline">
              <div id="playhead"></div>
            </div>
            <audio controls className="custom-audio" src={audioURL}></audio>
            <button onClick={downloadAudio} style={{
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              color: '#fff',
              border: 'none',
              marginTop: '10px'
            }}>
              Envoyer
            </button>
          </div>
        )}
        {!audioURL && (
          <button onClick={isRecording ? stopRecording : startRecording} style={{
            borderRadius: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: isRecording ? '#ff6347' : '#28a745',
            borderColor: isRecording ? '#ff6347' : '#28a745',
            color: '#fff',
            border: 'none',
            marginRight: '10px'
          }}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        )}
      </div>
      <style>{`
        #pButton {
          float: left;
          margin-top: 12px;
          cursor: pointer;
          transition: all 0.3s ease-in-out; /* Ajout de l'animation de transition */
        }

        #timeline {
          width: 90%;
          height: 2px;
          margin-top: 20px;
          margin-left: 10px;
          border-radius: 15px;
          background: rgba(0, 0, 0, 0.3);
        }

        #playhead {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: -3px;
          background: black;
          cursor: pointer;
        }

        .custom-audio {
          width: 100%;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder;
