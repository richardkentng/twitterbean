import * as express from "express";
const mongoose = require("mongoose");
import createError from "http-errors";
import requireAuth from "../middleware/requireAuth";
const router = express.Router();

// create
router.post("/", requireAuth, async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return next(createError(400, "You must provide text."));
  }

  const Post = mongoose.model("Post");
  const post = await Post.create({
    text,
    // @ts-ignore
    user: req.session.userId,
  });

  // const User = mongoose.model("User");
  // // @ts-ignore
  // const user = await User.findById(req.session.userId)
  // user.posts.push(post._id)
  // await user.save()

  return res.json(post);
});

// list
router.get("/", async (req, res, next) => {
  const Post = mongoose.model("Post");
  // @ts-ignore
  const posts = await Post.find().populate({
    path: "user",
    model: "User",
  });
  return res.json(posts);
});

// edit
router.put("/:id", async(req, res, next) => {
  const Post = mongoose.model("Post");
  // console.log("POST ID>>>>> ", req.params.id)
  const post = await Post.findById(req.params.id);
  post.text = req.body.content
  // console.log(req.body.content)
  await post.save()
  return res.json(post);
})


module.exports = router;

