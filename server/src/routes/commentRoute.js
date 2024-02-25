const express = require("express");
const { authenticate } = require("../config/authenticate");

const {
  createComment,
  getComment,
  getParticularComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/:id", authenticate, createComment);
router.get("/allComment/:id", authenticate, getComment);
router.get("/:id", authenticate, getParticularComment);

router.delete("/delete/:id", authenticate, deleteComment);

module.exports = router;
