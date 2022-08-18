import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    password: String
  }
  type Query {
    user(_id: ID!): User
  }
  type Mutation {
    signUp(username: String, email: String, password: String): User
    signIn(email: String, password: String): User
  }
`;

export default userTypeDefs;
