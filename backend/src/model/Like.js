const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

module.exports = Like;
