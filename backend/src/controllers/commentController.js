const asyncHandler = require("express-async-handler");

const Comment = require("../model/Comment");
const Post = require("../model/Post");

const createComment = asyncHandler(async (req, res) => {
  const modelType = req.body.modelType;
  const modelId = req.params.id;
  const userId = req.user.id;
  const content = req.body.content;
  try {
    if (modelType == "Post") {
      var commentable = await Post.findById(modelId).populate("comments");
    } else if (modelType == "Comment") {
      var commentable = await Comment.findById(modelId).populate("comments");
    } else {
      throw new Error("Unknown model type");
    }

    const comment = await Comment.create({
      content: content,
      user: userId,
      onModel: modelType,
      commentable: modelId,
      comments: [],
      likes: [],
    });

    commentable.comments.push(comment);
    await commentable.save();
    const newComment = await Comment.findById(comment._id).populate(
      "user",
      "-password"
    );
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// get all comments of particular user
const getComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.find({ commentable: req.params.id })
      .populate("user", "-password")
      .sort({ createdAt: -1 });
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//Particular comment
const getParticularComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("user")
      .populate("post")
      .sort({ createdAt: -1 });
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  const post = await Post.findById(comment.commentable);
  try {
    await Comment.findByIdAndDelete(req.params.id);
    await post.updateOne({ $pull: { comments: comment.id } });
    const newPost = await Post.findById(post._id).populate({
      path: "comments",
      populate: { path: "user" },
    });
    res.status(200).json(newPost.comments);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = {
  createComment,
  getComment,
  getParticularComment,
  deleteComment,
};
