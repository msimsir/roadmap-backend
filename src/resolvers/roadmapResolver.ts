import mongoose from "mongoose";
import { Roadmap } from "../models";
import { toObjectId } from "../utils";

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
    getRoadmapsOfUser: async (_, { userId }, context) => {
      if (!context.user.id) throw new Error("YOU'RE UNAUTHENTICATED");
      return await Roadmap.find({ userId });
    },
  },
  Mutation: {
    createRoadmap: async (
      _,
      { title, description, tags, elements, userId },
      context
    ) => {
      if (!context.user.id) throw new Error("YOU'RE UNAUTHANTICATED");
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
    likeRoadmap: async (_, { _id }, context) => {
      if (!context.user.id) throw new Error("YOU'RE UNAUTHANTICATED");
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error("NO ROADMAP WITH THAT ID");
      }
      const roadmap = await Roadmap.findById(_id);
      const index = roadmap.likes.findIndex(
        (id) => id == String(context.user.id)
      );
      if (index === -1) {
        roadmap.likes.push(context.user.id);
      } else {
        roadmap.likes = roadmap.likes.filter(
          (id) => id === toObjectId(context.user.id)
        );
      }

      const updatedRoadmap = await Roadmap.findByIdAndUpdate(_id, roadmap, {
        new: true,
      });

      return updatedRoadmap;
    },
  },
};

export default roadmapResolvers;
