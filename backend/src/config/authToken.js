const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("./serverConfig");
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_KEY, { expiresIn: "10d" });
};

module.exports = generateToken;
