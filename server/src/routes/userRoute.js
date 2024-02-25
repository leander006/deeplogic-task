const express = require("express");
const { authenticate } = require("../config/authenticate");
const { follow } = require("../controllers/mediaController");
// const { setNotifications, getNotifications, removeNotifications } = require('../controllers/notifyController');
const router = express.Router();
const {
  allUser,
  particularUser,
  groupUser,
  updateUser,
  loginUser,
  userById,
  uploadPic,
  friendSearch,
  token,
} = require("../controllers/userController");

router.get("/", authenticate, allUser);
router.get("/oneUser", authenticate, particularUser);
router.get("/", authenticate, groupUser);
router.get("/:id", authenticate, userById);
router.get("/freind/search", authenticate, friendSearch);
router.post("/upload", authenticate, uploadPic);
router.put("/update/:id", authenticate, updateUser);
router.get("/loginUser/user", authenticate, loginUser);
router.get("/:id/verify/:token", token);

module.exports = router;
