import { Schema, Types } from "mongoose";
import * as mongoose from "mongoose";

const User = new Schema({
  handle: String,
  passwordHash: { type: String, select: false },
  firstName: String,
  lastName: String,
  picture: String,
  joinDate: {type: Date, default: Date.now},
  posts: [{ type: Types.ObjectId, ref: "Post" }],
});

mongoose.model("User", User);
