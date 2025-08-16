import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE, GET_EXPENSES } from '../graphql/queries';

const AddExpenseForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: GET_EXPENSES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dateObj = new Date(date);
    const isoDate = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString();

    await addExpense({
      variables: {
        title,
        amount: parseFloat(amount),
        category,
        date: isoDate
      },
    });

    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        required
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddExpenseForm;
