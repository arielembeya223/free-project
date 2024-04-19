import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const url=window.dash.url
function Annonce() {
  const [csrfToken, setCsrfToken] = useState('');
const [posts, setPosts] = useState([]);
useEffect(() => {
  // Récupération du token CSRF lors du chargement du composant
  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('/csrf-token');
      setCsrfToken(response.data.csrf_token);
    } catch (error) {
      console.error('Erreur lors de la récupération du token CSRF :', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts :', error);
    }
  };

  fetchCsrfToken();
  fetchPosts();
}, []);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <form action={url} method='POST'>
              <input type="hidden" name="_token" value={csrfToken} />
                <div className="mb-3">
                  <textarea className="form-control" placeholder="Quoi de neuf ?" rows="3" name='content'></textarea>
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
            <div className="card-header">Derniers Post</div>
            <ul className="list-group list-group-flush">
            {posts.map((post) => (
          <li key={post.id} className="list-group-item">{post.content}</li>
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
