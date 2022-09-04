import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

const userResolvers = {
  Query: {
    user: async (_, { _id }) => {
      return await User.findById({ _id });
    },
  },
  Mutation: {
    signUp: async (_, { firstName, lastName, username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("USER ALREADY EXISTS");
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
        });
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        return { user, token };
      } catch (error) {
        throw new Error(error);
      }
    },
    signIn: async (_, { email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) throw new Error("USER DOESN'T EXIST");
        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!isPasswordCorrect) throw new Error("INVALID CREDENTIALS");
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        return { user: existingUser, token };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default userResolvers;
