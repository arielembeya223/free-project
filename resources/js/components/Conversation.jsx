import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone ,faDownload,faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import 'regenerator-runtime/runtime';
import './styles.css';
import CustomTextarea from './CustomTextarea';
import { useSpeechRecognition } from 'react-speech-recognition';
import { TailSpin } from 'react-loader-spinner';
// SVGs de Heroicons
const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon-class" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <path d="M14 2v6h6" />
  </svg>
);

const SpreadsheetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon-class" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4z" />
    <path d="M4 10h16M10 4v16" />
  </svg>
);

const PresentationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon-class" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
    <path d="M12 17v4M8 21h8" />
    <path d="M8 12h8M8 8h8M8 16h8" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon-class" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

//
const AudioOptions = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleIconClick = () => {
    setShowPopup(!showPopup);
  }
  };
//
const audio = window.dash.audio;
const id = window.dash.id;
const url = window.dash.url;
const conv = '/dashboard-' + id + "/conversation";

function ContactsList({ contacts, setActiveContact }) {
  return (
    <div className="col-4 border-end">
      <h2 className="text-center">Contacts</h2>
      <ul className="list-group">
        {contacts.map((contact, index) => (
          <li key={index} className="list-group-item" onClick={() => setActiveContact(contact)}>
            <a href={conv + "-" + contact.id} className="text-decoration-none">{contact.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessageList({ messages }) {
  const [showPopupMap, setShowPopupMap] = useState({});

  
  const handleIconClick = (messageId) => {
    setShowPopupMap(prevState => ({
      ...prevState,
      [messageId]: !prevState[messageId] // Inverse l'état actuel pour ce message
    }));
  }; 
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const csrfResponse = await axios.get('/csrf-token');
        setCsrfToken(csrfResponse.data.csrf_token);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } 
    };

    fetchData();
  }, []);
  return (
    <div className="messages-container">
      {messages.map(message => {
        let messageClass = "received-message text-start";
        let messageContentClass = "received-message-content bg-dark text-light p-2 rounded mb-2";

        if (message.sender_id != id) {
          messageClass = "sent-message text-end";
          messageContentClass = "sent-message-content bg-primary text-light p-2 rounded mb-2";
        }

        return (
          <div key={message.id} style={{ marginTop: '22px' }} className={messageClass}>
          {message.type === 'audio' ? (
            <div className="custom-audio-player">
              <audio controls>
                <source src={'/storage/' + message.contenu} type="audio/mpeg" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
              <div className="audio-controls">
                <div className="audio-volume">
                    <FontAwesomeIcon icon={faEllipsisV} onClick={() => handleIconClick(message.id)}/>
                    {showPopupMap[message.id] && (
                      <div className="floating-box">
                        <form action='/translate' method='POST'>
                          <input type="hidden" name='path' value={message.contenu}/>
                          <input type="hidden" name="_token" value={csrfToken} />
                          <button className="btn btn-primary  position-relative mb-4"  type="submit">Traduire</button>
                        </form>
                      </div>
                    )}
                </div>
                <div className="audio-duration">
                  {message.duree}
                </div>
              </div>
            </div>
          ) : message.type === 'docx' ? (
            <div className={messageContentClass}>
              <DocumentIcon className="icon-class" />
              <span>Document Word</span>
              <a href={'/storage/' + message.contenu} download>
                   <FontAwesomeIcon icon={faDownload}  />
              </a>
            </div>
          ) : message.type === 'xlsx' ? (
            <div className={messageContentClass}>
              <SpreadsheetIcon className="icon-class " />
              <span>Document Excel</span>
              <a href={'/storage/' + message.contenu} download>
                <FontAwesomeIcon icon={faDownload} />
              </a>
            </div>
          ) : message.type === 'pptx' ? (
            <div className={messageContentClass}>
              <PresentationIcon className="icon-class" />
              <span>Document PowerPoint</span>
              <a href={'/storage/' + message.contenu} download>
                <FontAwesomeIcon icon={faDownload} />
              </a>
            </div>
          ) : (
            <span className={messageContentClass}>
              {message.contenu}
            </span>
          )}
        </div>
      );
    })}
  </div>
  );
}

function MessageThread({ activeContact }) {
  const [csrfToken, setCsrfToken] = useState('');
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transcriptionText, setTranscriptionText] = useState('');

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csrfResponse = await axios.get('/csrf-token');
        setCsrfToken(csrfResponse.data.csrf_token);

        const messagesResponse = await axios.get('/messages');
        setMessages(messagesResponse.data);

        const contactsResponse = await axios.get('/contacts');
        setContacts(contactsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTranscript = (e) => {
    e.preventDefault();
    console.log('Transcription:', transcript);
    setTranscriptionText(transcript);
    resetTranscript();
  };

  return (
    <div className="col-8">
{isLoading ? (
        <div className="loader">
          <TailSpin
            height="50"
            width="50"
            color="blue"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <>
          {messages.length === 0 && <div>Aucun message trouvé</div>}
          <MessageList messages={messages}/>
          <div className="App">
            <form action={url} method="POST">
              <input type="hidden" name="_token" value={csrfToken} />
              <CustomTextarea placeholder="Écrivez votre message..." audio={audio} />
            </form>
            
          </div>
        </>
      )}
    </div>
  );
}

function Conversation() {
  const [activeContact, setActiveContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <MessageThread activeContact={activeContact} />
        <ContactsList contacts={contacts} setActiveContact={setActiveContact} />
      </div>
    </div>
  );
}

const styles = `
.custom-audio-player {
  display: flex;
  align-items: center;
}

.custom-audio-player audio {
  margin-right: 10px;
  width: 200px;
}

.custom-audio-player .audio-controls {
  display: flex;
  align-items: center;
}

.custom-audio-player .audio-volume {
  margin-right: 10px;
}

.custom-audio-player .audio-duration {
  font-size: 12px;
}
`;

if (document.getElementById('Conversation')) {
  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleTag);

  const Index = createRoot(document.getElementById("Conversation"));
  Index.render(
    <React.StrictMode>
      <Conversation />
    </React.StrictMode>
  );
}
