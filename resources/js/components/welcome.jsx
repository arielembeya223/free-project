import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { createRoot } from 'react-dom';

import CubeAnimation from './CubeAnimation';

import {Header} from './header';
//url de connexion
const connectRoute = window.routes.connect;


// url d'inscription
const inscriptionRoute = window.routes.inscription;


// Récupérer de home page
const homeRoute = window.routes.home;

function Welcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.5
    });

    observer.observe(document.querySelector('.features'));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* En-tête */}
       
          <Header />
      {/* Contenu principal */}
      <main className="py-5" style={{ minHeight: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container text-center">
          <div>
            <h2 style={{ fontWeight: 700 }}>Rejoignez Free Social</h2>
            <p className="lead" style={{ fontSize: '1.4rem' }}>Connectez-vous ou inscrivez-vous pour commencer à utiliser Free Social.</p>
            <div className="mt-4">
              <a href={connectRoute} className="btn btn-primary me-3 rounded px-4">Se connecter</a> {/* Ajout de la classe "rounded-pill" pour des coins arrondis et de la classe "px-4" pour un espacement horizontal */}
              <a href={inscriptionRoute} className="btn btn-secondary rounded px-4">S'inscrire</a> {/* Ajout de la classe "rounded-pill" pour des coins arrondis et de la classe "px-4" pour un espacement horizontal */}
            </div>
          </div>
        </div>
      </main>

      {/* Fonctionnalités */}
      <div className="features py-5">
        {/* Ajoutez vos fonctionnalités ici */}
      </div>

      {/* Animation */}
      <CubeAnimation />
    </div>
  );
}

if (document.getElementById('welcome')) {
  const Index = createRoot(document.getElementById("welcome"));

  Index.render(
    <React.StrictMode>
      <Welcome />
    </React.StrictMode>
  )
}
