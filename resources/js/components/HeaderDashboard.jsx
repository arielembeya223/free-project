import React from 'react';
import { createRoot } from 'react-dom';
//url de connexion
const show = window.dash.show;


// url d'inscription
const message = window.dash.message;


// Récupérer de home page
const annonce = window.dash.annonce;
////
export function HeaderDashboard() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{paddingTop: '20px', paddingBottom: '20px'}}>
      <div className="container">
        <a className="navbar-brand" href="#" style={{fontSize: '24px'}}>Free social</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link"  href={show}>Accueil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={message}>Messages</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"  href={annonce}>Annonces</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"  href="#">Dashboard</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

if (document.getElementById('headerDashboard')) {
  const Index = createRoot(document.getElementById("headerDashboard"));
  Index.render(
    <React.StrictMode>
      <HeaderDashboard />
    </React.StrictMode>
  )
}
