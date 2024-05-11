import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { createRoot } from 'react-dom';

const addContact = window.dash.add;

const canal = window.dash.canal;


// Styles personnalisés pour les boîtes modales
const customContactModalStyles = {
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
    height: '200px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const customChannelModalStyles = {
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
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Contacts({ contacts, openContactModal }) {
  return (
    <div className="card">
      <div className="card-header">Contacts</div>
      <ul className="list-group list-group-flush">
        {contacts.map((contact) => (
          <li key={contact.id} className="list-group-item">{contact.name}</li>
        ))}
      </ul>
      <button className="btn btn-dark btn-block mt-3" onClick={openContactModal}>Ajouter un contact</button>
    </div>
  );
}

function Profil() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [contacts, setContacts] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Récupération du token CSRF lors du chargement du composant
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/csrf-token');
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF :', error);
      }
    };

    const fetchContacts = async () => {
      try {
        const response = await axios.get('/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
      }
    };
    const fetchChannels = async () => {
      try {
        const response = await axios.get('/myCanal');
        setChannels(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des canaux :', error);
      }
    };
    fetchChannels();
    fetchCsrfToken();
    fetchContacts();
  }, []);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const openChannelModal = () => {
    setIsChannelModalOpen(true);
  };

  const closeChannelModal = () => {
    setIsChannelModalOpen(false);
  };

  const handleContactInputChange = (event) => {
    setNewContactName(event.target.value);
  };

  const handleChannelNameChange = (event) => {
    setNewChannelName(event.target.value);
  };

  const handleChannelDescriptionChange = (event) => {
    setChannelDescription(event.target.value);
  };

  const handleAddContact = async (event) => {
    event.preventDefault();
    try {
      // Soumission du formulaire avec le token CSRF
      await axios.post(addContact, {
        newContactName: newContactName,
        _token: csrfToken // Ajout du token CSRF dans la requête
      });
      console.log("Nouveau contact ajouté :", newContactName);
      setNewContactName('');
      closeContactModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact :', error);
    }
  };

  const handleCreateChannel = async (event) => {
    event.preventDefault();
    try {
      // Soumission du formulaire avec le token CSRF
      await axios.post('/create-channel', {
        name: newChannelName,
        description: channelDescription,
        _token: csrfToken // Ajout du token CSRF dans la requête
      });
      console.log("Nouveau canal créé :", newChannelName);
      setNewChannelName('');
      setChannelDescription('');
      closeChannelModal();
    } catch (error) {
      console.error('Erreur lors de la création du canal :', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Contacts contacts={contacts} openContactModal={openContactModal} />
        </div>
        <div className="col-md-9">
          <div className="card" style={{ width: '100%' }}>
            <div className="card-header bg-dark text-white">Canaux</div>
            <div className="card-body">
              <ul className="list-group" style={{ width: '100%' }}>
                {channels.map((channel) => (
                  <li
                    key={channel.id}
                    className={`list-group-item ${channel.isActive ? 'dark' : ''}`}
                    onClick={() => setActiveChannel(channel.id)}
                    style={{ width: '100%' }}
                  >
                    {channel.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className="btn btn-dark btn-block mt-3" onClick={openChannelModal}>Créer un canal</button>
        </div>
      </div>

      {/* Modal pour ajouter un contact */}
      <Modal
        isOpen={isContactModalOpen}
        onRequestClose={closeContactModal}
        contentLabel="Ajouter un contact"
        style={customContactModalStyles} // Appliquer les styles personnalisés à la modale
      >
        <h3>Ajouter un contact</h3>
        <form action={addContact} method="POST">
          {/* Champ caché pour le token CSRF */}
          <input type="hidden" name="_token" value={csrfToken} />
          <input
            type="text"
            className="form-control"
            placeholder="Nom du contact"
            name="content"
            value={newContactName}
            onChange={handleContactInputChange}
          />
          <div className="mt-2">
            <button className="btn btn-primary mr-2" type="submit">Ajouter</button>
            <button className="btn btn-secondary m-2" onClick={closeContactModal}>Annuler</button>
          </div>
        </form>
      </Modal>

      {/* Modal pour créer un canal */}
      <Modal
        isOpen={isChannelModalOpen}
        onRequestClose={closeChannelModal}
        contentLabel="Créer un canal"
        style={customChannelModalStyles} // Appliquer les styles personnalisés à la modale
      >
        <h3>Créer un canal</h3>
        <form action={canal} method='POST'>
        <input type="hidden" name="_token" value={csrfToken} />
          <input
            type="text"
            className="form-control"
            placeholder="Nom du canal"
            name="name"
          />
          <textarea
            className="form-control mt-2"
            placeholder="Description du canal"
            name="description"
          />
          <div className="mt-2">
            <button className="btn btn-primary mr-2" type="submit">Créer</button>
            <button className="btn btn-secondary m-2" onClick={closeChannelModal}>Annuler</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

if (document.getElementById('Profil')) {
  const Index = createRoot(document.getElementById("Profil"));
  Index.render(
    <React.StrictMode>
      <Profil />
    </React.StrictMode>
  );
}

export default Profil;
