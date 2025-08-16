import React from 'react';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { useQuery, gql } from '@apollo/client';
import MonthlySummaryChart from './components/MonthlySummary';

const GET_EXPENSES = gql`
  query GetExpenses {
    getExpenses {
      id
      title
      amount
      category
      date
    }
  }
`;

const App = () => {
  const today = new Date();
  const { data, loading, error } = useQuery(GET_EXPENSES, {
    variables: { month: today.getMonth() + 1, year: today.getFullYear() },
    fetchPolicy: 'network-only',
  });
  console.log('Expenses data for chart:', data?.getExpenses);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Expense Manager</h1>
      <AddExpenseForm />
      <hr />
      <ExpenseList />
      <hr />
      <h2>Monthly Expense Summary</h2>
      {data?.getExpenses?.length ? (
        <MonthlySummaryChart data={data.getExpenses} />
      ) : (
        <p>No expenses for this month.</p>
      )}
    </div>
  );
};

export default App;
