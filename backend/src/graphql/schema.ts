import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Expense {
    id: ID!
    title: String!
    amount: Float!
    category: String!
    date: String!
  }

  type Query {
    getExpenses(month: Int, year: Int): [Expense]
  }

  type Mutation {
    addExpense(title: String!, amount: Float!, category: String!, date: String!): Expense!
    updateExpense(id: ID!, title: String, amount: Float, category: String, date: String): Expense
    deleteExpense(id: ID!): Boolean!
  }
`;


// getExpenses: [Expense!]!