import React from 'react';
import { createRoot } from 'react-dom';


function Message({ message }) {
  return (
    <div className="message">
      <div className="message-header">
        <span className="message-sender">{message.sender}</span>
        <span className="message-timestamp">{message.timestamp}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
}

function Chat() {
  const messages = [
    { id: 1, sender: 'John', content: 'Salut, comment ça va ?', timestamp: '12:30' },
    { id: 2, sender: 'Alice', content: 'Ça va bien, merci ! Et toi ?', timestamp: '12:31' },
    { id: 3, sender: 'Bob', content: 'Bonjour tout le monde !', timestamp: '12:32' },
    { id: 4, sender: 'Eva', content: 'Salut John et Alice !', timestamp: '12:33' },
    // Ajoutez d'autres messages ici
  ];

  return (
    <div className="chat">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

function Content() {
  // Contenu du composant Channel
  return (
    <div className="channel">
      <h2>Canal Telegram</h2>
      <Chat />
    </div>
  );
}

function Channel() {
  if (document.getElementById('canal')) {
    const Index = createRoot(document.getElementById("canal"));
    Index.render(
      <React.StrictMode>
        <Content />
      </React.StrictMode>
    );
  }
}

export default Channel
