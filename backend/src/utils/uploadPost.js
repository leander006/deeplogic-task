const Post = require("../model/Post");
const User = require("../model/User");

const posts = async (title, description, content, user, isDraft) => {
  const newPost = new Post({
    owner: user,
    content: {
      public_id: content?.public_id,
      url: content?.url,
    },
    title,
    description,
    isDraft,
  });

  const post = await newPost.save();
  await User.findByIdAndUpdate(user, { $inc: { postCount: 1 } }, { new: true });
  return post;
};

module.exports = {
  posts,
};
