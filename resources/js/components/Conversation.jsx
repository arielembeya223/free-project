import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import CustomTextarea from './CustomTextarea';
const id= window.dash.id;
const conv ='/dashboard-'+id+"/conversation"
function ContactsList({ contacts, setActiveContact }) {
  return (
    <div className="col-4 border-end">
      <h2 className="text-center">Contacts</h2>
      <ul className="list-group">
        {contacts.map(contact => (
          <li key={contact.id} className="list-group-item" onClick={() => setActiveContact(contact)}>
            <a href={conv+"-"+contact.id}>{contact.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessageThread({ activeContact }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour !", sender: "contact" },
    { id: 2, text: "Salut ! Comment ça va ?", sender: "me" },
    { id: 3, text: "Ça va bien, merci ! Et toi ?", sender: "contact" },
    { id: 4, text: "Je vais bien aussi, merci !", sender: "me" }
  ]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "me" }
      ]);
      setMessage('');
    }
  };

  const handleVoiceMessage = () => {
    // Ajoutez ici la logique pour les messages vocaux
  };
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/csrf-token');
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF :', error);
      }
    };
    fetchCsrfToken();
  })
  return (
    <div className="col-8">
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} style={{"marginTop":"22px"}} className={message.sender === "contact" ? "received-message text-start" : "sent-message text-end"}>
            <span className={message.sender === "contact" ? "bg-primary text-light p-2 rounded mb-2" : "bg-dark text-light p-2 rounded mb-2"}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="App">
        <form action="" method="POST">
          <input type="hidden" name="_token" value={csrfToken} />
          <CustomTextarea placeholder="Écrivez votre message..." />
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

if (document.getElementById('Conversation')) {
  const Index = createRoot(document.getElementById("Conversation"));
  Index.render(
    <React.StrictMode>
      <Conversation />
    </React.StrictMode>
  )
}
