import React from 'react';

const discussionStyle = {
  width: '20%',
  borderRight: '1px solid #e1e4e8',
  height: '100vh',
  overflowY: 'auto'
};

const listItemStyle = {
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  marginBottom: '15px',
  padding: '15px',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const listItemHoverStyle = {
  transform: 'scale(1.02)',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
};

export function DiscussionZone() {
  // Simuler des données de messages avec le nom de l'auteur
  const messages = [
    { author: 'John', content: 'Message 1' },
    { author: 'Jane', content: 'Message 2' },
    { author: 'Alice', content: 'Message 3' },
    { author: 'Bob', content: 'Message 4' },
    { author: 'Eve', content: 'Message 5' }
  ];

  return (
    <div id="DiscussionZone" className="col-md-3" style={discussionStyle}>
      <div className="p-3">
        <h2 className="h4">Derniers messages</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {messages.map((message, index) => (
            <li key={index} style={{ ...listItemStyle, ...(index % 2 === 0 && listItemHoverStyle) }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{message.author}</p>
              <p style={{ margin: 0 }}>{message.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DiscussionZone;
