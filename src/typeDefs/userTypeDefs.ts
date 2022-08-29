import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type Query {
    user(_id: ID!): User!
    me: User!
  }
  type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
  }
  type User {
    _id: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }
`;

export default userTypeDefs;
