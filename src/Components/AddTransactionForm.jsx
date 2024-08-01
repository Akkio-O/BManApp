import React, { useState } from 'react';

const AddTransactionForm = ({ addTransaction }) => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      description,
    };
    addTransaction(newTransaction);
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-bold mb-2">Добавить транзакцию</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">
            <input type="radio" name="type" value="income" checked={type === 'income'} onChange={() => setType('income')} />
            Доход
          </label>
          <label className="block">
            <input type="radio" name="type" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} />
            Расход
          </label>
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сумма"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Категория"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
