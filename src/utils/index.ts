import mongoose from "mongoose";

export const toObjectId = (value: string) => {
  const ObjectId = mongoose.Types.ObjectId;
  return new ObjectId(value);
};
