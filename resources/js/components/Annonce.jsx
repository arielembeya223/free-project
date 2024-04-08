import React from 'react';
import { createRoot } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function Annonce() {
  // Simulation des tweets
  const tweets = [
    "Premier tweet",
    "Deuxième tweet",
    "Troisième tweet",
    "Quatrième tweet",
    "Cinquième tweet",
    "Sixième tweet",
    "Septième tweet",
    "Huitième tweet",
    "Neuvième tweet",
    "Dixième tweet"
  ];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <textarea className="form-control" placeholder="Quoi de neuf ?" rows="3"></textarea>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faMicrophone} style={{ color: 'red', fontSize: '24px' }} />
                  </div>
                  <button type="submit" className="btn btn-primary">Publier</button>
                </div>
              </form>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Derniers tweets</div>
            <ul className="list-group list-group-flush">
              {tweets.map((tweet, index) => (
                <li key={index} className="list-group-item">{tweet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

if (document.getElementById('Annonce')) {
  const Index = createRoot(document.getElementById("Annonce"));
  Index.render(
    <React.StrictMode>
      <Annonce />
    </React.StrictMode>
  )
}
