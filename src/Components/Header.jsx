import React from 'react';
import SignupForm from './Header/Reglog';

;
const img = "./logo.png"

const Header = () => {

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <img src={img} alt='logo' />
        <h2>BManApp</h2>
      </div>
      <SignupForm />
    </header>
  );
};

export default Header;
