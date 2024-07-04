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
  authorId: Author;
  likes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
}

interface Author {
  avatar?: {
    url: string;
  };
  name: string;
  designation: string;
}

export enum Category {
  BEAUTY = "Beauty",
  ENTREPRENEURSHIP = "Entrepreneurship",
  PERSONAL_GROWTH_AND_DEVELOPMENT = "Personal-Growth-and-Development",
  APPLICATION = "Application",
  DATA = "Data",
  SOFTWARE = "Software",
  TECH = "Tech",
  SCIENCE = "Science",
  LIFESTYLE = "Lifestyle",
  HEALTH = "Health",
  TRAVEL = "Travel",
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
    authorId: {
      avatar: {
        url: { type: String, default: "" },
      },
      name: { type: String, required: true },
      designation: { type: String, default: "" },
    },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
