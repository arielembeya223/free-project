import React, { useState } from 'react';
import { createRoot } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import CustomTextarea from './CustomTextarea';
function ContactsList({ contacts, setActiveContact }) {
  return (
    <div className="col-4 border-end">
      <h2 className="text-center">Contacts</h2>
      <ul className="list-group">
        {contacts.map(contact => (
          <li key={contact.id} className="list-group-item" onClick={() => setActiveContact(contact)}>
            {contact.name}
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
        <form action="" method="">
          <CustomTextarea placeholder="Écrivez votre message..." />
        </form>
      </div>
    </div>
  );
}

function App() {
  const [activeContact, setActiveContact] = useState(null);
  const [contacts] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" }
  ]);

  return (
    <div className="container py-5">
      <div className="row">
        <MessageThread activeContact={activeContact} />
        <ContactsList contacts={contacts} setActiveContact={setActiveContact} />
      </div>
    </div>
  );
}

if (document.getElementById('Messages')) {
  const Index = createRoot(document.getElementById("Messages"));
  Index.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
