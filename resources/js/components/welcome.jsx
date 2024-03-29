import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom/client';
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
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
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
      <main className="py-5">
        <div className="container text-center">
          <h2>Rejoignez Free Social</h2>
          <p className="lead">Connectez-vous ou inscrivez-vous pour commencer à utiliser Free Social.</p>
          <div className="mt-4">
            <a href="#" className="btn btn-primary mr-5">Se connecter</a>
            <a href="#" className="btn btn-secondary m-3">S'inscrire</a>
          </div>
          <div className="features py-5">
            <h3>Fonctionnalités de Free Social</h3>
            <motion.div
              className="feature mb-4"
              style={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-size-xxl">Communication mondiale</h4>
              <p className="font-size-lg">Communiquez avec tout le monde sans barrières linguistiques.</p>
            </motion.div>
            <motion.div
              className="feature mb-4"
              style={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-size-xxl">Chats et discussions</h4>
              <p className="font-size-lg">Ouvrez des canaux de discussion avec n'importe qui et parlez-leur dans leur propre langue.</p>
            </motion.div>
            <motion.div
              className="feature mb-4"
              style={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="font-size-xxl">Traduction vocale</h4>
              <p className="font-size-lg">Traduisez les messages vocaux en temps réel dans la langue de votre interlocuteur.</p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Animation */}
      <CubeAnimation />
    </div>
  );
}

if (document.getElementById('welcome')) {
  const Index = ReactDOM.createRoot(document.getElementById("welcome"));

  Index.render(
    <React.StrictMode>
      <Welcome />
    </React.StrictMode>
  )
}
