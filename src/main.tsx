import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { TournamentProvider } from './context/TournamentContext';
import './estilos.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <TournamentProvider>
        <App />
      </TournamentProvider>
    </React.StrictMode>
  );
}
