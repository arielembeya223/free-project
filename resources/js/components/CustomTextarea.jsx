import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import WaveSurfer from 'wavesurfer.js';
import './voice.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    width: '500px',
    height: '200px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#292929',
    borderRadius: '10px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  body: {
    marginBottom: '20px',
  },
  closeButton: {
    backgroundColor: '#007bff',
    border: 'none',
    cursor: 'pointer',
  },
  closeButtonHover: {
    backgroundColor: '#0056b3',
  },
};

function CustomTextarea({ placeholder }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wavesurferRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    console.log("Message envoyé :", message);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsRecording(false);
  };

  const handleVoiceMessage = () => {
    openModal();
    setIsRecording(true);
  };

  return (
    <div className="custom-textarea">
      <textarea
        type="text"
        name="content"
        placeholder={placeholder}
        value={message}
        onChange={handleMessageChange}
      ></textarea>
      <div className="icons">
        <button
          type="button"
          onClick={sendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <button
          type="button"
          onClick={handleVoiceMessage}
        >
          <FontAwesomeIcon icon={faMicrophone} className={isRecording ? 'recording' : ''} />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Boîte de dialogue modale"
        style={customStyles}
      >
        <div>
          <h2 style={customStyles.title}>Enregistrement vocal</h2>
          <p style={customStyles.body}>Cliquez sur le bouton pour commencer l'enregistrement.</p>
          <div ref={wavesurferRef}></div>
          <button onClick={closeModal} style={customStyles.closeButton}>Fermer</button>
        </div>
      </Modal>
    </div>
  );
}

export default CustomTextarea;
