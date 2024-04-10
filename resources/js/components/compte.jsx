import React from 'react';
import { createRoot } from 'react-dom';
//url de connexion
const show = window.dash.show;


// url d'inscription
const message = window.dash.message;


// Récupérer de home page
const annonce = window.dash.annonce;
////
const compte=window.dash.compte;
///
export function Compte() {
  return (
    <h1>bonjour compte</h1>
  );
}

if (document.getElementById('Compte')) {
  const Index = createRoot(document.getElementById("Compte"));
  Index.render(
    <React.StrictMode>
      <Compte />
    </React.StrictMode>
  )
}
