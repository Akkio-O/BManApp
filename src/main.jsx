import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Modal from 'react-modal';

// доступ модального окна
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
      <App />,
)