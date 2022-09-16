import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [{ type: String, required: true }],
  elements: {
    type: String,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  ],
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
