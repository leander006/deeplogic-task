const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const { JWT_KEY } = require("../config/serverConfig");

const UserSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
    },
    provider: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profile: {
      public_id: String,
      url: String,
    },
    bio: {
      type: String,
      default: "",
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    status: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    postCount: {
      type: Number,
      default: 0,
    },
    likedPost: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    },
    shared: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    },
    isVerified: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.genJWT = function generate() {
  return JWT.sign({ id: this._id, email: this.email }, JWT_KEY, {
    expiresIn: "1h",
  });
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
