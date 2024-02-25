require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  KEY: process.env.KEY,
};
