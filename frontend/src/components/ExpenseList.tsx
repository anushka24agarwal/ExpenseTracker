import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXPENSES } from '../graphql/queries';

const ExpenseList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_EXPENSES);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error loading expenses</p>;

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {data.getExpenses.map((expense: any) => (
          <li key={expense.id}>
            <strong>{expense.title}</strong> - ${expense.amount} - {expense.category} -{' '}
            {expense.date ? new Date(expense.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'No Date'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
