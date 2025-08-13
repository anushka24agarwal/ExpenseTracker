import request from 'supertest';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from '/Users/sharadagarwal/Desktop/ExpenseManager/backend/src/graphql/schema';
import { resolvers } from '/Users/sharadagarwal/Desktop/ExpenseManager/backend/src/graphql/resolvers';
import '../tests/setup'; // runs the MongoDB memory setup

let server: any;
let app: any;

beforeAll(async () => {
  app = express();
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });
});

afterAll(async () => {
  await server.stop();
});

describe('Expense GraphQL API', () => {
  it('should add and fetch expenses', async () => {
    // 1. Add expense
    const addRes = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            addExpense(
              title: "Test Expense",
              amount: 25.5,
              category: "Food",
              date: "2025-08-04"
            ) {
              id
              title
              amount
              category
              date
            }
          }
        `
      })
      .expect(200);

    expect(addRes.body.data.addExpense.title).toBe("Test Expense");

    // 2. Fetch expenses
    const getRes = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            getExpenses {
              title
              amount
              category
              date
            }
          }
        `
      })
      .expect(200);

    expect(getRes.body.data.getExpenses.length).toBe(1);
    expect(getRes.body.data.getExpenses[0].title).toBe("Test Expense");
  });
});
