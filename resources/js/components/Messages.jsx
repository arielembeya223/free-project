import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import CustomTextarea from './CustomTextarea';
const id= window.dash.id;
//'/dashboard-${id}/conversation'
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
      <div className="row">
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
