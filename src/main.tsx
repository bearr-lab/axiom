import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AxiomSessionProvider } from './context/AxiomSessionContext';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AxiomSessionProvider><App /></AxiomSessionProvider>
  </StrictMode>,
);
