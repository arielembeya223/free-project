import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap'; // Utilisation du spinner de reactstrap

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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/allCanal');
        setNotifications(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des canaux :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div id="SettingsDashboardZone" className="col-md-3" style={settingsStyle}>
      <div className="card">
        <div className="card-body" style={notificationsContainerStyle}>
          <div style={headerStyle}>
            <h5 style={{ margin: 0 }}>Canal</h5>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spinner color="primary" /> {/* Utilisation d'un spinner de reactstrap */}
            </div>
          ) : (
            notifications.map(notification => (
              <div key={notification.id} style={notificationStyle}>
                <span>{notification.name}</span>
                <a href={"/Channel-"+notification.id} className="blockquote-footer text-decoration-none">voir</a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsDashboardZone;
