import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { validateEnv } from './lib/env';

// Validate environment variables before the app starts
try {
  validateEnv();
} catch (error) {
  console.error('Environment validation failed:', error.message);
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <App />
  </React.StrictMode>
);