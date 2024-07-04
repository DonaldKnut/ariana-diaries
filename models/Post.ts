import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User";
import Comment from "./Comment";

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  category: Category;
  excerpt: string;
  quote: string;
  content: string;
  userId: mongoose.Schema.Types.ObjectId;
  userImage?: string;
  author: mongoose.Schema.Types.ObjectId[];
  likes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
}

export enum Category {
  BEAUTY = "beauty",
  ENTREPRENEURSHIP = "entrepreneurship",
  PERSONAL_GROWTH_AND_DEVELOPMENT = "personal-growth-and-development",
  APPLICATION = "application",
  DATA = "data",
  SOFTWARE = "software",
  TECH = "tech",
  SCIENCE = "science",
  LIFESTYLE = "lifestyle",
  HEALTH = "health",
  TRAVEL = "travel",
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, minlength: 4 },
    description: { type: String, required: true, minlength: 20 },
    image: { type: String, required: true },
    category: { type: String, enum: Object.values(Category), required: true },
    excerpt: { type: String, required: true, minlength: 10, default: "" },
    quote: { type: String, required: true, minlength: 6, default: "" },
    content: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userImage: { type: String, default: "" },
    author: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
