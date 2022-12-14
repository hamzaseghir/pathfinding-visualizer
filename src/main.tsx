import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PathfindingVisualizer from './components/PathfindingVisualizer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PathfindingVisualizer />
  </React.StrictMode>
);
