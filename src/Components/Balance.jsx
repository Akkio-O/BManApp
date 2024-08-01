import React from 'react';

const Balance = ({ balance }) => {
  return (
    <section className="mb-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Общий баланс</h2>
        <p id="balance" className="text-2xl mt-2">Р. {balance.toFixed(2)}</p>
      </div>
    </section>
  );
};

export default Balance;
