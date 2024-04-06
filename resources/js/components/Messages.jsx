import React from 'react';
import { createRoot } from 'react-dom';
//url de connexion

////
export function Messages() {
  return (
      <div>bonjour</div>
  );
}

if (document.getElementById('Messages')) {
  const Index = createRoot(document.getElementById("Messages"));
  Index.render(
    <React.StrictMode>
      <Messages/>
    </React.StrictMode>
  )
}
