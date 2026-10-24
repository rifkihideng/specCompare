import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// BrowserRouter membungkus seluruh aplikasi agar navigasi berbasis URL
// (routing) tersedia di semua komponen. Titik masuk ini hanya merender
// <App /> ke elemen #root yang ada di index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
