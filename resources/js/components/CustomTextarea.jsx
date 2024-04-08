import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';

function CustomTextarea({ placeholder }) {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    // Logique pour envoyer le message
  };

  const handleVoiceMessage = () => {
    // Logique pour envoyer un message vocal
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
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      </div>
    </div>
  );
}

export default CustomTextarea;
