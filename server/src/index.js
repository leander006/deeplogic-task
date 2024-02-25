const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const { MONGO_URI, PORT } = require("./config/serverConfig");

const app = express();

app.set("trust proxy", 1);
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongodb"))
  .catch((err) => {
    console.log("invalid", err);
  });

app.use(
  cors({
    origin: [URL, "http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.listen(PORT, async () => {
  console.log(`Backend runnig on port ${PORT}`);
});
