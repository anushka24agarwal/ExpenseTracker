import { gql } from '@apollo/client';

export const GET_EXPENSES = gql`
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

export const ADD_EXPENSE = gql`
  mutation AddExpense(
    $title: String!
    $amount: Float!
    $category: String!
    $date: String!
  ) {
    addExpense(title: $title, amount: $amount, category: $category, date: $date) {
      id
      title
      amount
      category
      date
    }
  }
`;
