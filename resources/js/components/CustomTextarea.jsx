import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import AudioRecorder from './AudioRecorder';
import './voice.css'; // Importer les styles CSS

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
};

const CustomTextarea = ({ placeholder }) => {
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Boîte de dialogue modale"
        style={customStyles} // Appliquer les styles personnalisés à la modale
      >
        <AudioRecorder />
      </Modal>
    </div>
  );
};

export default CustomTextarea;
