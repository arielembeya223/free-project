import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import CustomTextarea from './CustomTextarea';
const audio=window.dash.audio;
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
          <div key={message.id} style={{ "marginTop": "22px" }} className={messageClass}>
            {message.type === 'audio' ? (
              <div className="custom-audio-player">
                <audio controls>
                  <source src={'/storage/'+message.contenu} type="audio/mpeg" />
                  Votre navigateur ne supporte pas l'élément audio.
                </audio>
                <div className="audio-controls">
                  <div className="audio-volume">
                    <FontAwesomeIcon icon={faMicrophone} />
                  </div>
                  <div className="audio-duration">
                    {message.duree}
                  </div>
                </div>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération du token CSRF
        const csrfResponse = await axios.get('/csrf-token');
        setCsrfToken(csrfResponse.data.csrf_token);

        // Récupération des messages
        const messagesResponse = await axios.get('/messages');
        console.log('Réponse de la requête de messages :', messagesResponse.data);
        setMessages(messagesResponse.data);

        // Récupération des contacts
        const contactsResponse = await axios.get('/contacts');
        console.log('Réponse de la requête de contacts :', contactsResponse.data);
        setContacts(contactsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  console.log('Messages dans le composant MessageThread :', messages);
  console.log('Contacts dans le composant Conversation :', contacts);

  return (
    <div className="col-8">
      {messages.length === 0 && <div>Aucun message trouvé</div>}
      <MessageList messages={messages} />
      <div className="App">
        <form action={url} method="POST">
          <input type="hidden" name="_token" value={csrfToken} />
          <CustomTextarea placeholder="Écrivez votre message..." audio={audio} />
        </form>
      </div>
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
        console.log('Réponse de la requête de contacts :', response.data); // Afficher la réponse de la requête dans la console
        setContacts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
      }
    };
    fetchContacts();
  }, []);

  console.log('Contacts dans le composant Conversation :', contacts); // Afficher les contacts dans la console

  return (
    <div className="container py-5">
      <div className="row">
        <MessageThread activeContact={activeContact} />
        <ContactsList contacts={contacts} setActiveContact={setActiveContact} />
      </div>
    </div>
  );
}

// Stylisation de l'élément audio
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
  )
}
