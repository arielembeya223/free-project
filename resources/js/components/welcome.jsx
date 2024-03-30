import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createRoot } from 'react-dom';
import CubeAnimation from './CubeAnimation';

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
                  <a className="nav-link" href="#">Accueil</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Connexion</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Inscription</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="py-5" style={{ minHeight: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container text-center">
          <div>
            <h2 style={{ fontWeight: 700 }}>Rejoignez Free Social</h2>
            <p className="lead" style={{ fontSize: '1.4rem' }}>Connectez-vous ou inscrivez-vous pour commencer à utiliser Free Social.</p>
            <div className="mt-4">
              <a href="#" className="btn btn-primary me-3 rounded px-4">Se connecter</a> {/* Ajout de la classe "rounded-pill" pour des coins arrondis et de la classe "px-4" pour un espacement horizontal */}
              <a href="#" className="btn btn-secondary rounded px-4">S'inscrire</a> {/* Ajout de la classe "rounded-pill" pour des coins arrondis et de la classe "px-4" pour un espacement horizontal */}
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
