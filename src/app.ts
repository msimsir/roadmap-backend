import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import auth from "./middleware/auth";

dotenv.config();
const app = express();
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => auth(req),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  await server.start();
  server.applyMiddleware({ app });
  mongoose.connect(process.env.CONNECTION_URL);
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer();
