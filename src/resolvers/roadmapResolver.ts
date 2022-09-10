import { Roadmap } from "../models";

const roadmapResolvers = {
  Query: {
    getRoadmap: async (_, { _id }) => {
      return await Roadmap.findById({ _id });
    },
    getRoadmaps: async (_, args) => {
      const { search = null, page = 1, limit = 20 } = args;
      let searchQuery = {};
      if (search) {
        //update search query
        searchQuery = {
          $or: [
            {
              title: { $regex: search, $options: "i" },
            },
            {
              tags: { $regex: search, $options: "i" },
            },
          ],
        };
      }

      const roadmaps = await Roadmap.find(searchQuery)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();
      const count = await Roadmap.countDocuments(searchQuery);
      return {
        roadmaps,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    },
    getRoadmapsOfUser: async (_, { userId }) => {
      return await Roadmap.find({ userId });
    },
  },
  Mutation: {
    createRoadmap: async (
      _,
      { title, description, tags, elements, userId }
    ) => {
      const roadmap = new Roadmap({
        title,
        description,
        tags,
        elements,
        userId,
      });
      await roadmap.save();
      return roadmap;
    },
  },
};

export default roadmapResolvers;
