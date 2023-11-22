import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DataContextProvider } from './context/DataContext';
import { CartContextProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
        <DataContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </DataContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);