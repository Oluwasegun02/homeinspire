import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creator: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  // tags: {
  //   type: [String],
  // },
  postImg: {
    type: String,
  },
  // likes: {
  //   type: [String],
  //   default: [],
  // },
  // comments: {
  //   type: [String],
  //   default: [],
  // },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
