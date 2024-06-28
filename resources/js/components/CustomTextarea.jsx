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
    width: '400px',
    height: '300px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#FFFFFF,',
    borderRadius: '10px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const CustomTextarea = ({ placeholder,audio }) => {
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
          type="submit"
          onClick={sendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <button
          type="button"
          onClick={openModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
          </svg>

        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Boîte de dialogue modale"
        style={customStyles} // Appliquer les styles personnalisés à la modale
      >
        <AudioRecorder audio={audio} />
      </Modal>
    </div>
  );
};

export default CustomTextarea;
