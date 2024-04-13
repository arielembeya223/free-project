import React, { useState } from 'react';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = handleDataAvailable;
        recorder.onstop = handleStopRecording;
        recorder.start(); // Commence immédiatement l'enregistrement
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
    setChunks([...chunks, event.data]);
  };

  const handleStopRecording = () => {
    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);

    // Récupérer la durée de l'enregistrement
    const audioElement = new Audio(url);
    audioElement.addEventListener('loadedmetadata', () => {
      console.log('Durée de l\'enregistrement :', audioElement.duration, 'secondes');
    });
  };

  const downloadAudio = () => {
    if (audioURL) {
      const downloadLink = document.createElement('a');
      downloadLink.href = audioURL;
      downloadLink.setAttribute('download', 'audio');
      downloadLink.click();
    }
  };

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {audioURL && (
        <div>
          <audio controls src={audioURL}></audio>
          <button onClick={downloadAudio}>Download Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
