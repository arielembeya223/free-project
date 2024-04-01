import React, { useState } from 'react';
import { createRoot } from 'react-dom';
import { FlagIcon } from 'react-flag-kit'; // Assurez-vous d'avoir installé react-flag-kit ou toute autre bibliothèque pour les drapeaux

// Fonction utilitaire pour obtenir le nom de langue à partir du code de langue
const getLanguageName = (languageCode) => {
  switch (languageCode) {
    case 'fr':
      return 'Français';
    case 'en':
      return 'Anglais';
    case 'es':
      return 'Espagnol';
    case 'de':
      return 'Allemand';
    case 'zh':
      return 'Mandarin';
    // Ajouter d'autres cas pour les langues supplémentaires
    default:
      return '';
  }
};

// Fonction utilitaire pour obtenir le code de drapeau à partir du code de langue
const getFlagCode = (languageCode) => {
  switch (languageCode) {
    case 'fr':
      return 'FR';
    case 'en':
      return 'GB';
    case 'es':
      return 'ES';
    case 'de':
      return 'DE';
    case 'zh':
      return 'CN'; // Utilisation du code de pays ISO 3166-1 pour la Chine (CN) pour le mandarin
    // Ajouter d'autres cas pour les langues supplémentaires
    default:
      return null;
  }
};

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    language: 'fr' // Langue par défaut
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter ici la logique pour soumettre le formulaire
    console.log('Formulaire d\'inscription soumis :', formData);
  };

  return (
    <div>
      <h2>Inscription</h2>
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom :</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe :</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="language" className="form-label me-2">Langue :</label>
          <select id="language" name="language" value={formData.language} onChange={handleChange} className="form-select" required>
            <option value="fr">{getLanguageName('fr')}</option>
            <option value="en">{getLanguageName('en')}</option>
            <option value="es">{getLanguageName('es')}</option>
            <option value="de">{getLanguageName('de')}</option>
            <option value="zh">{getLanguageName('zh')}</option>
            {/* Ajouter d'autres langues avec les drapeaux correspondants */}
          </select>
          <div style={{marginLeft: '10px'}}>
            <FlagIcon code={getFlagCode(formData.language)} />
          </div>
        </div>
        <button  className="btn btn-primary">S'inscrire</button>
      </div>
    </div>
  );
}

if (document.getElementById('registration')) {
  const RegistrationRoot = createRoot(document.getElementById('registration'));
  RegistrationRoot.render(
    <React.StrictMode>
      <RegistrationForm />
    </React.StrictMode>
  );
}

export default RegistrationForm;
