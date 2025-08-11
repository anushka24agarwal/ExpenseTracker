import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const startServer = async () => {
  const app = express() as any;
  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) throw new Error('MONGO_URI not set');

  await connectDB();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();