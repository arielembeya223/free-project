import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioRecorder = ({ audio }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/csrf-token');
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <div className="container d-flex flex-row align-items-center justify-content-center my-4 mb-5">
      <form action={audio} method="POST" encType="multipart/form-data" className="mx-3">
        <label className="custom-file-upload">
          <input type="file" accept='audio/*' name='audio' />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
          </svg>
        </label>
        <input type="hidden" name="_token" value={csrfToken} />
        <button type="submit">Envoyer</button>
      </form>

      <form action={audio} method="POST" encType="multipart/form-data" className="mx-3">
        <label className="custom-file-upload">
          <input type="file" accept="*" name='audio' />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </label>
        <input type="hidden" name="_token" value={csrfToken} />
        <button type="submit">Envoyer</button>
      </form>

      <form action={audio} method="POST" encType="multipart/form-data" className="mx-3">
        <label className="custom-file-upload">
          <input type="file" accept="*" name='audio' />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </label>
        <input type="hidden" name="_token" value={csrfToken} />
        <button type="submit">Envoyer</button>
      </form>

      <style jsx>{`
        .container {
          text-align: center;
        }
        form {
          margin-top: 20px;
        }
        button {
          cursor: pointer;
          background-color: #343a40;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          transition: background-color 0.3s ease, transform 0.2s ease;
          margin-top: 10px;
          font-size: 16px;
        }
        button:hover {
          background-color: #23272b;
          transform: translateY(-2px);
        }
        button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 58, 64, 0.5);
        }
        .custom-file-upload {
          cursor: pointer;
          display: inline-block;
          padding: 14px 28px;
          background-color: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .custom-file-upload:hover {
          background-color: #e6e6e6;
          border-color: #ccc;
        }
        .custom-file-upload input {
          display: none;
        }
        .custom-file-upload svg {
          margin-right: 0;
        }
        .icon {
          width: 48px;
          height: 48px;
        }
        .mx-3 {
          margin-left: 1rem;
          margin-right: 1rem;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder;
