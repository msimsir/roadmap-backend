import { Roadmap } from "../models";

const roadmapResolvers = {
  Query: {
    getRoadmap: async (_, { _id }) => {
      return await Roadmap.findById({ _id });
    },
  },
  Mutation: {
    createRoadmap: async (_, { title, description, tags, userId }) => {
      const roadmap = new Roadmap({ title, description, tags, userId });
      await roadmap.save();
      return roadmap;
    },
  },
};

export default roadmapResolvers;
