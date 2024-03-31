import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { createRoot } from 'react-dom';



//url de connexion
const connectRoute = window.routes.connect;


// url d'inscription
const inscriptionRoute = window.routes.inscription;


// Récupérer de home page
const homeRoute = window.routes.home;

export function Header() {

  return (
    <div>  
      <header className="bg-dark py-4">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="#">Free Social</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href={homeRoute}>Accueil</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={connectRoute}>Connexion</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={inscriptionRoute}>Inscription</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

if (document.getElementById('header')) {
  const Index = createRoot(document.getElementById("header"));

  Index.render(
    <React.StrictMode>
      <Header />
    </React.StrictMode>
  )
}
