import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import CustomTextarea from './CustomTextarea';

const id = window.dash.id;
const conv = '/dashboard-' + id + "/conversation";

function ContactsList({ contacts, setActiveContact }) {
  return (
    <div className="col-4 border-end">
      <h2 className="text-center">Contacts</h2>
      <ListGroup className="text-center"> {/* Centrer les éléments */}
        {contacts.map(contact => (
          <ListGroup.Item key={contact.id} action onClick={() => setActiveContact(contact)} style={{ height: '60px', border: 'none' }}> {/* Styles directement ajoutés ici */}
            <a href={conv + "-" + contact.id} style={{ textDecoration: 'none' }}> {/* Styles directement ajoutés ici */}
              <div className="d-flex justify-content-between align-items-center">
                <div>{contact.name}</div>
                <div className="badge bg-primary">4</div> {/* Exemple de badge pour les messages non lus */}
              </div>
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

function App() {
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
      <div className="row justify-content-center"> {/* Centrer les éléments */}
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
