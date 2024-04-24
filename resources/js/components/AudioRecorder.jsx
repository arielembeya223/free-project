import React, { useState } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);

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

  const downloadAudio = () => {
    if (audioURL) {
      const downloadLink = document.createElement('a');
      downloadLink.href = audioURL;
      downloadLink.setAttribute('download', 'audio.mp3');
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
