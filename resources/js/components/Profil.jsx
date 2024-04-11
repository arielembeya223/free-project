import React from 'react';
import { createRoot } from 'react-dom';

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
      <div className="card-footer">
        <button className="btn btn-primary btn-block">Ajouter un contact</button>
      </div>
    </div>
  );
}

function Messages() {
  // Supposons que messages est un tableau d'objets avec les détails des messages
  const messages = [
    { id: 1, sender: "John Doe", text: "Salut tout le monde !" },
    { id: 2, sender: "Jane Smith", text: "Comment ça va ?" },
    { id: 3, sender: "Alice Johnson", text: "Quoi de neuf ?" },
    { id: 4, sender: "Bob Brown", text: "Super journée aujourd'hui !" },
  ];

  return (
    <div className="card">
      <div className="card-header">Messages</div>
      <ul className="list-group list-group-flush">
        {messages.map((message) => (
          <li key={message.id} className="list-group-item">
            <strong>{message.sender}: </strong>{message.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Profil() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Contacts />
        </div>
        <div className="col-md-9">
          <Messages />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <form>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Rechercher des contacts" />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">Rechercher</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <button className="btn btn-success btn-block">Ajouter un contact</button>
        </div>
      </div>
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
