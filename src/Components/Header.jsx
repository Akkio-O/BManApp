import React from 'react';

const img = "./logo.png"

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <img src={img} alt='logo'/>
        <h2>BManApp</h2>
      </div>
    </header>
  );
};

export default Header;
