const Comment = require("../model/Comment");
const Post = require("../model/Post");
const Like = require("../model/Like");
const User = require("../model/User");

const likeController = async (req, res) => {
  const modelId = req.params.id;
  const userId = req.user.id;
  const modelType = req.body.modelType;
  const user = await User.findById(userId);
  try {
    if (modelType == "Post") {
      var likeable = await Post.findById(modelId).populate("likes");
    } else if (modelType == "Comment") {
      var likeable = await Comment.findById(modelId).populate("likes");
    } else {
      throw new Error("Unknown model type");
    }

    let exists = await Like.findOne({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await Like.findByIdAndDelete(exists.id);
      await user.updateOne({ $pull: { likedPost: req.params.id } });
    } else {
      const newLike = await Like.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await user.updateOne({ $push: { likedPost: req.params.id } });
      await likeable.save();
    }
    const newUser = await User.findById(req.user._id);
    return res
      .cookie("data", JSON.stringify(newUser), {
        sameSite: "none",
        secure: true,
        expire: new Date(Date.now() + 60 * 60 * 1000),
      })
      .status(200)
      .json(newUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shareController = async (req, res) => {
  const modelId = req.params.id;
  const userId = req.body.id;
  const user = await User.findById(userId);
  try {
    const share = await Post.findById(modelId).populate("shared");

    share.shared.push(userId);
    await user.updateOne({ $push: { shared: modelId } });
    await likeable.save();

    return res.status(200).send("Shared to ", user?.username);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  likeController,
  shareController,
};
