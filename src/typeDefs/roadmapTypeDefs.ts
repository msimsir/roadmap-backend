import { gql } from "apollo-server-express";

const roadmapTypeDefs = gql`
  type Roadmap {
    _id: String
    title: String
    description: String
    tags: [String]
    userId: String
  }
  type Query {
    getRoadmap(_id: ID!): Roadmap
  }
  type Mutation {
    createRoadmap(
      title: String
      description: String
      tags: [String]
      userId: String
    ): Roadmap
  }
`;

export default roadmapTypeDefs;
