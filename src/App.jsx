import React, { useState } from 'react';
import "./index.css";
import Header from './Components/Header';
import Balance from './Components/Balance';
import AddTransactionForm from './Components/AddTransactionForm';
import TransactionList from './Components/TransactionList';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
    }, 0);
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <Header />
      <main className="p-4">
        <Balance balance={calculateBalance()} />
        <div className="flex justify-center space-x-4 mb-4">
          <AddTransactionForm addTransaction={addTransaction} />
        </div>
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
};

export default App;