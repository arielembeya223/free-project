import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap'; // Vous pouvez utiliser n'importe quel spinner ou loader de votre choix

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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/lasts');
        setMessages(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div id="DiscussionZone" className="col-md-3" style={discussionStyle}>
      <div className="p-3">
        <h2 className="h4">Derniers messages</h2>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Spinner color="primary" /> {/* Utilisation d'un spinner de reactstrap */}
          </div>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {messages.map((message, index) => (
              <li key={index} style={{ ...listItemStyle, ...(index % 2 === 0 && listItemHoverStyle) }}>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{message.sender_name}</p>
                <p style={{ margin: 0 }}>{message.contenu}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DiscussionZone;
