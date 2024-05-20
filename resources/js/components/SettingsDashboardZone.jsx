import React, { useState, useEffect } from 'react';


const settingsStyle = {
  width: '20%',
};

const notificationsContainerStyle = {
  padding: '20px',
};

const notificationStyle = {
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#f7f7f7',
  borderRadius: '5px',
};

const headerStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  display: 'flex',
  alignItems: 'center',
};

const bellIconStyle = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
};

export function SettingsDashboardZone() {
  // Simuler des données de notifications
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/allCanal');
        setNotifications(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des canaux :', error);
      }
    };
    fetchNotifications();
  }, []);
  // Fonction pour supprimer une notification


  return (
    <div id="SettingsDashboardZone" className="col-md-3" style={settingsStyle}>
      <div className="card">
        <div className="card-body" style={notificationsContainerStyle}>
          <div style={headerStyle}>
            <h5 style={{ margin: 0 }}>Canal</h5>
          </div>
          {notifications.map(notification => (
            <div key={notification.id} style={notificationStyle}>
              <span>{notification.name}</span>
             <a href={"/Channel-"+notification.id} class="blockquote-footer text-decoration-none">voir</a>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default SettingsDashboardZone;
