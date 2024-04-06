import React, { useState } from 'react';

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
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nouvelle notification 1' },
    { id: 2, message: 'Nouvelle notification 2' },
    { id: 3, message: 'Nouvelle notification 3' },
    { id: 4, message: 'Nouvelle notification 4' },
    { id: 5, message: 'Nouvelle notification 5' }
  ]);

  // Fonction pour supprimer une notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div id="SettingsDashboardZone" className="col-md-3" style={settingsStyle}>
      <div className="card">
        <div className="card-body" style={notificationsContainerStyle}>
          <div style={headerStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" style={bellIconStyle} viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M19.97 17c-.71-5.32-3.69-9-7.97-9-4.28 0-7.26 3.68-7.97 9-.05.33-.03.69.08 1.04.19.68.69 1.25 1.41 1.67l.5.29c.39.23.85.35 1.31.35h12c.45 0 .91-.12 1.31-.35l.5-.29c.72-.42 1.22-.99 1.41-1.67.12-.35.14-.71.09-1.04zM12 20c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"/>
            </svg>
            <h5 style={{ margin: 0 }}>Notifications</h5>
          </div>
          {notifications.map(notification => (
            <div key={notification.id} style={notificationStyle}>
              <span>{notification.message}</span>
              <button className="btn btn-sm btn-danger" onClick={() => removeNotification(notification.id)}>Supprimer</button>
            </div>
          ))}
          {notifications.length === 0 && <p>Aucune notification</p>}
        </div>
      </div>
    </div>
  );
}

export default SettingsDashboardZone;
