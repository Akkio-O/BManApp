import React, { useState } from 'react';
import Modal from 'react-modal';
import './base/modal.css';

// Классовая настройка TailwindCSS
const label = 'block mb-2 text-lg'
const input = 'ring-2 ring-gray-300 w-5/6 rounded p-1 '
const button = 'mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'

const customStyles = {
  content: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    border: '1px solid #cccccc',
    borderRadius: '10px',
    padding: '20px',
    width: '400px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  }
};
const img = "./logo.png"

Modal.setAppElement('#root');


const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true); // true для регистрации, false для авторизации

  function openModal() {
    setIsOpen(true);
  }

  const switchForm = () => {
    setIsRegister(!isRegister);
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <img src={img} alt='logo' />
        <h2>BManApp</h2>
      </div>
      <div>
        <button className={button} onClick={openModal}>Авторизация</button>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal} действие вызывается после открытия модального окна
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Authentication Modal"
          className="ReactModal__Content"
        >
          <button onClick={closeModal} className={button + 'text-xl p-2 w-1/6 border-none rounded-full cursor-pointer'}>
            X
          </button>
          <h2 className='color-2c3e50 text-center text-2xl mb-5'>{isRegister ? 'Регистрация' : 'Авторизация'}</h2>
          <form>
            <div className='space-y-4 flex flex-col'>
              {isRegister && (
                <>
                  <div className='space-x-4'>
                    <label className={label} htmlFor="username">Логин</label>
                    <input className={input} type="text" id="username" name="username" required />
                  </div>
                </>
              )}
              <div className='space-x-4'>
                <label className={label} htmlFor="email">Email</label>
                <input className={input} type="email" id="email" name="email" required />
              </div>
              <div className='space-x-4'>
                <label className={label} htmlFor="password">Пароль</label>
                <input className={input} type="password" id="password" name="password" required />
              </div>
              {isRegister && (
                <>
                  <div className='space-x-4'>
                    <label className={label} htmlFor="confirmPassword">Подтвердить пароль</label>
                    <input className={input} type="password" id="confirmPassword" name="confirmPassword" required />
                  </div>
                </>
              )}
            </div>
            <button className={button + ' w-full'} type="submit">
              {isRegister ? 'Регистрация' : 'Авторизация'}
            </button>
          </form>
          <button className={button + ' w-full'} onClick={switchForm}>
            {isRegister ? 'Авторизация' : 'Регистрация'}
          </button>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
