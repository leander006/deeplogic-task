const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const mediaRoute = require("./routes/mediaRoute");
const googleRoute = require("./routes/google-auth");
const commentRoute = require("./routes/commentRoute");

const { passportAuth } = require("./config/jwt");
const session = require("cookie-session");
const cors = require("cors");
const passport = require("passport");

const { MONGO_URL, URL, PORT, KEY } = require("./config/serverConfig");

const app = express();

app.set("trust proxy", 1);
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(console.log("Connected to mongodb"))
  .catch((err) => {
    console.log("invalid", err);
  });

app.use(
  cors({
    origin: ["https://deeplogic-task.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    secret: `${KEY}`,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportAuth(passport);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", authRoute);
app.use("/api/auth/google", googleRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/media", mediaRoute);
app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.listen(PORT, async () => {
  console.log(`Backend runnig on port ${PORT}`);
});
