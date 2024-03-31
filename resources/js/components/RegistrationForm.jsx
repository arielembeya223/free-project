// RegistrationForm.js
import React, { useState } from 'react';
import { createRoot } from 'react-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Prénom :</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Nom :</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe :</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  );
}

if (document.getElementById('registration')) {
  const RegistrationRoot = createRoot(document.getElementById("registration"));
  RegistrationRoot.render(
    <React.StrictMode>
      <RegistrationForm />
    </React.StrictMode>
  );
}

export default RegistrationForm;
