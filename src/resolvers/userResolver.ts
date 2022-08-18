import { User } from "../models";

const userResolvers = {
  Query: {
    user: async (_, { _id }) => {
      return await User.findById({ _id });
    },
  },
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    signIn: async (_, { email, password }) => {
      const user = await User.find({ email, password });
      if (!user) {
        throw new Error("USER DOES NOT EXIST");
      }
    },
  },
};

export default userResolvers;
