const express = require("express");
const { authenticate } = require("../config/authenticate");
const {
  likeController,
  shareController,
} = require("../controllers/mediaController");
const router = express.Router();

router.post("/like/:id", authenticate, likeController);
router.post("/share/:/id", authenticate, shareController);

module.exports = router;
