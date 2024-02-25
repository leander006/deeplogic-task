const express = require("express");
const { authenticate } = require("../config/authenticate");
const {
  createPost,
  getPost,
  particularPost,
  deletePost,
  likePost,
  uploadPost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/", authenticate, createPost);
router.post("/postUpload/postImg", authenticate, uploadPost);
router.get("/", authenticate, getPost);
router.get("/:id", authenticate, particularPost);
router.delete("/delete/:id", authenticate, deletePost);
router.get("/liked/Post", authenticate, likePost);


module.exports = router;
