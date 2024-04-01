import React, { useState } from 'react';
import { createRoot } from 'react-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe :</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit"  className="btn btn-primary">S'inscrire</button>
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
