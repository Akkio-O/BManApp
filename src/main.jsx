import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// for errors
import { StrictMode } from 'react';
// modal window
import Modal from 'react-modal';

// доступ модального окна
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
      <StrictMode>
            <App />,
      </StrictMode>
)