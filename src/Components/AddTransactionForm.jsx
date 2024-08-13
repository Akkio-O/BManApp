import React, { useState } from 'react';

const AddTransactionForm = ({ addTransaction }) => {
  const [type, setType] = useState('income');
  const [values, setValues] = useState({
    amount: '',
    category: '',
    description: '',
  });
  const inputs = [
    { name: 'amount', type: 'number', placeholder: 'Сумма' },
    { name: 'category', type: 'text', placeholder: 'Категория' },
    { name: 'description', type: 'text', placeholder: 'Описание' },
  ];
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(values.amount),
      category: values.category,
      description: values.description,
    };
    addTransaction(newTransaction);
    setValues({ amount: '', category: '', description: '' });
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
        {inputs.map((input, index) => (
        <div className="mb-4" key={index}>
          <input
            type={input.type}
            value={values[input.name]}
            onChange={(e) => handleChange(input.name, e.target.value)}
            placeholder={input.placeholder}
            className="w-full p-2 border rounded"
            required={input.name !== 'description'}
          />
        </div>
      ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
