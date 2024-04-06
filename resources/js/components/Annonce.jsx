import React from 'react';
import { createRoot } from 'react-dom';
//url de connexion

////
export function Annonce() {
  return (
      <div>annonce</div>
  );
}

if (document.getElementById('Annonce')) {
  const Index = createRoot(document.getElementById("Annonce"));
  Index.render(
    <React.StrictMode>
      <Annonce/>
    </React.StrictMode>
  )
}
