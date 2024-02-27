const express = require("express");
const { authenticate } = require("../config/authenticate");
const {
  createPost,
  getPost,
  particularPost,
  deletePost,
  likePost,
  uploadPost,
  schedulePost,
  updatePost,
  data,
} = require("../controllers/postController");

const router = express.Router();

router.post("/", authenticate, createPost);
router.post("/postUpload/postImg", authenticate, uploadPost);
router.put("/", authenticate, updatePost);
router.get("/", authenticate, getPost);
router.get("/:id", authenticate, particularPost);
router.delete("/delete/:id", authenticate, deletePost);
router.get("/liked/Post", authenticate, likePost);
router.get("/data/:id", authenticate, data);
router.put("/schedule", authenticate, schedulePost);

module.exports = router;
