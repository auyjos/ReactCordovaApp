import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<App />);
});
