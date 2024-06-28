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
    case 'sw':
      return 'Swahili';
    case 'ln':
      return 'Lingala';
    case 'yo':
      return 'Yoruba';
    case 'ig':
      return 'Igbo';
    case 'ha':
      return 'Hausa';
    case 'am':
      return 'Amharique';
    case 'zu':
      return 'Zoulou';
    case 'xh':
      return 'Xhosa';
    case 'wo':
      return 'Wolof';
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
    case 'sw':
      return 'KE'; // Utilisation du code de pays ISO 3166-1 pour le Kenya (KE) pour le swahili
    case 'ln':
      return 'CD'; // Utilisation du code de pays ISO 3166-1 pour la République démocratique du Congo (CD) pour le lingala
    case 'yo':
      return 'NG'; // Utilisation du code de pays ISO 3166-1 pour le Nigéria (NG) pour le yoruba
    case 'ig':
      return 'NG'; // Utilisation du code de pays ISO 3166-1 pour le Nigéria (NG) pour l'igbo
    case 'ha':
      return 'NG'; // Utilisation du code de pays ISO 3166-1 pour le Nigéria (NG) pour le hausa
    case 'am':
      return 'ET'; // Utilisation du code de pays ISO 3166-1 pour l'Éthiopie (ET) pour l'amharique
    case 'zu':
      return 'ZA'; // Utilisation du code de pays ISO 3166-1 pour l'Afrique du Sud (ZA) pour le zoulou
    case 'xh':
      return 'ZA'; // Utilisation du code de pays ISO 3166-1 pour l'Afrique du Sud (ZA) pour le xhosa
    case 'wo':
      return 'SN'; // Utilisation du code de pays ISO 3166-1 pour le Sénégal (SN) pour le wolof
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
    lang: 'fr' // Langue par défaut
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name === 'lang' ? 'lang' : e.target.name]: e.target.value
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
          <input type="text" id="name" name="name" placeholder='nom' value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="email" id="email" name="email" placeholder='exemple@gmail.com' value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe :</label>
          <input type="password" id="password" name="password" placeholder='password' value={formData.password} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="language" className="form-label me-2">Langue :</label>
          <select id="language" name="lang" value={formData.lang} onChange={handleChange} className="form-select" required>
            <option value="fr">{getLanguageName('fr')}</option>
            <option value="en">{getLanguageName('en')}</option>
            <option value="es">{getLanguageName('es')}</option>
            <option value="de">{getLanguageName('de')}</option>
            <option value="zh">{getLanguageName('zh')}</option>
            <option value="sw">{getLanguageName('sw')}</option>
            <option value="ln">{getLanguageName('ln')}</option>
            <option value="yo">{getLanguageName('yo')}</option>
            <option value="ig">{getLanguageName('ig')}</option>
            <option value="ha">{getLanguageName('ha')}</option>
            <option value="am">{getLanguageName('am')}</option>
            <option value="zu">{getLanguageName('zu')}</option>
            <option value="xh">{getLanguageName('xh')}</option>
            <option value="wo">{getLanguageName('wo')}</option>
            {/* Ajouter d'autres langues avec les drapeaux correspondants */}
          </select>
          <div style={{marginLeft: '10px'}}>
            <FlagIcon code={getFlagCode(formData.lang)} />
          </div>
        </div>
        <input type="hidden" name="lang" value={formData.lang} />
        <button className="btn btn-primary">S'inscrire</button>
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
