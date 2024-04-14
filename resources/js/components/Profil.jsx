import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';

const addContact = window.dash.add;

// Styles personnalisés pour la boîte modale
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

function Contacts() {
  // Supposons que contacts est un tableau d'objets avec les détails des contacts
  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];

  return (
    <div className="card">
      <div className="card-header">Contacts</div>
      <ul className="list-group list-group-flush">
        {contacts.map((contact) => (
          <li key={contact.id} className="list-group-item">{contact.name}</li>
        ))}
      </ul>
    </div>
  );
}

function Profil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

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

    fetchCsrfToken();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    setNewContactName(event.target.value);
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
      closeModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact :', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Contacts />
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">Messages</div>
            <div className="card-body">
              {/* Ajoutez votre composant de messages ici */}
            </div>
          </div>
        </div>
      </div>

      {/* Bouton pour ouvrir la modale */}
      <div className="row mt-4">
        <div className="col-md-6">
          <button className="btn btn-success btn-block" onClick={openModal}>Ajouter un contact</button>
        </div>
      </div>

      {/* Modal pour ajouter un contact */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Ajouter un contact"
        style={customStyles} // Appliquer les styles personnalisés à la modale
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
            onChange={handleInputChange}
          />
          <div className="mt-2">
            <button className="btn btn-primary mr-2" type="submit">Ajouter</button>
            <button className="btn btn-secondary m-2" onClick={closeModal}>Annuler</button>
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
  )
}
