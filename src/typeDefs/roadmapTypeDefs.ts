import { gql } from "apollo-server-express";

const roadmapTypeDefs = gql`
  type Roadmap {
    _id: String
    title: String
    description: String
    tags: [String]
    elements: String
    userId: String
    likes: [String]
  }
  type RoadmapResult {
    roadmaps: [Roadmap]
    currentPage: Int
    totalPages: Int
  }
  type Query {
    getRoadmap(_id: ID!): Roadmap
    getRoadmaps(search: String, page: Int, limit: Int): RoadmapResult
    getRoadmapsOfUser(userId: ID!): [Roadmap]
  }
  type Mutation {
    createRoadmap(
      title: String!
      description: String!
      tags: [String!]
      elements: String!
      userId: String!
    ): Roadmap
    likeRoadmap(_id: ID!): Roadmap
  }
`;

export default roadmapTypeDefs;
