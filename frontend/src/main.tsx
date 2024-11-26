// src/main.tsx or src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client'; // In React 18+, use react-dom/client
import App from './App'; // Import your App component

// Assuming you're using React 18+, render the app with the root API
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
