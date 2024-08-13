import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <section>
      <h3 className="text-xl font-bold mb-2">Транзакции</h3>
      <ul id="transactions" className="space-y-2">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="bg-white p-4 m-auto rounded shadow-md flex justify-between">
            <div>
              <strong>{transaction.category}</strong>
              <p>{transaction.description}</p>
            </div>
            <div className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
              {transaction.type === 'income' ? '+' : '-'}Р. {transaction.amount.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TransactionList;