const asyncHandler = require("express-async-handler");
const Comment = require("../model/Comment");
const Post = require("../model/Post");
const User = require("../model/User");
const Like = require("../model/Like");
const { cloudinary } = require("../utils/cloudinary");
const { posts } = require("../utils/uploadPost");
const schedule = require("node-schedule");
const { hours, days, oneMonth, threeMonth } = require("../utils/data");

const createPost = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  let isDraft = false;
  if (!title || !description || !content) {
    isDraft = true;
  }
  try {
    const post = await posts(
      title,
      description,
      content,
      req.user._id,
      isDraft
    );
    console.log(post);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const uploadPost = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      crop: "fill",
    });
    res.status(200).json(uploadResponse);
  } catch (err) {
    console.error("err.message ", err.message);
    res.status(500).json({ err: "Something went wrong" });
  }
};

const schedulePost = async (req, res) => {
  const { title, description, content, date } = req.body;
  const time = new Date(
    date.year,
    date.month - 1,
    date.dayOfMonth,
    date.hour,
    date.minute
  );
  try {
    schedule.scheduleJob(time, async () => {
      const post = await posts(
        title,
        description,
        content,
        req.user._id,
        false
      );
      console.log(post);
    });
    console.log("done api call");
    return res.status(200).json("Successfully scheduled your post");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updatePost = asyncHandler(async (req, res) => {
  const { title, description, content, id } = req.body;
  const post = await Post.findById({ _id: id });
  try {
    if (content) {
      await cloudinary.uploader.destroy(content.public_id);
    }
    const newPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title ? title : post.title,
        description: description ? description : post.description,
        content: content ? content : post.content,
        isDraft: false,
      },
      { new: true }
    );
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Get all post
const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find({ owner: req.user._id, isDraft: "true" }).sort(
      {
        createdAt: -1,
      }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

// Get post by id
const particularPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("owner");
    res.status(200).json(post);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

// Delete post
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user._id);

  try {
    await Post.findByIdAndDelete(req.params.id);
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { postCount: -1 } },
      { new: true }
    );

    await Comment.deleteMany({ commentable: req.params.id });
    await Like.deleteMany({ likeable: req.params.id });
    await user.updateOne({ $pull: { likedPost: req.params.id } });
    await user.updateOne({ $pull: { bookmarkedPost: req.params.id } });
    await cloudinary.uploader.destroy(post.content.public_id);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//Get post of users and its followings//

const followingPost = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.find({ owner: user._id })
      .populate("owner")
      .populate({ path: "likes", populate: { path: "user" } })
      .populate({ path: "comments", populate: { path: "user" } })
      .sort({ createdAt: -1 });
    const following = user.following;
    // Promise.all is use to get all post of user's following login user
    // console.log("following ", following);
    const morePost = await Promise.all(
      following.map((id) => {
        return Post.find({ owner: id })
          .populate("owner")
          .populate({ path: "likes", populate: { path: "user" } })
          .populate({ path: "comments", populate: { path: "user" } })
          .sort({ createdAt: -1 });
      })
    );
    // console.log("morePost ", morePost);
    const followerPost = post.concat(morePost.flat());
    // flat() is use to return json as a single object if not used it returned two object as [{},{}]

    res.status(200).json(followerPost);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

// Post of like
const likePost = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const likes = user.likedPost;
    // Promise.all is use to get all post of user's following login user
    const morePost = await Promise.all(
      likes.map((id) => {
        return (
          Post.find({ _id: id })
            .populate("owner")
            // .populate({ path: "likes", populate: { path: "username" } })
            // .populate({ path: "comments", populate: { path: "username" } })
            .sort({ createdAt: -1 })
        );
      })
    );
    res.status(200).json(morePost.flat());
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

const data = async (req, res) => {
  const id = req.params.id;
  try {
    if (id == 1) {
      return res.status(200).json({ data: hours, number: 23 });
    } else if (id == 2) {
      return res.status(200).json({ data: days, number: 90 });
    } else if (id == 3) {
      return res.status(200).json({ data: oneMonth, number: 150 });
    } else {
      return res.status(200).json({ data: threeMonth, number: 230 });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

//Post of bookmark

module.exports = {
  createPost,
  getPost,
  particularPost,
  deletePost,
  followingPost,
  likePost,
  updatePost,
  uploadPost,
  schedulePost,
  data,
};
