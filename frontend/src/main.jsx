import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { fetchWithAuth } from './api/fetchWithAuth';
import './index.css'; 

console.log('fetchWithAuth loaded:', fetchWithAuth);

// Modern React 19 rendering
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);