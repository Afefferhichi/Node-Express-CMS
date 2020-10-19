const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

const allUsers = require("./allUsers");
const addUser = require("./addUser");
const deleteUser = require("./deleteUser");
const login = require("./login");
const profile = require("./profile");
const register = require("./register");
const updateUser = require("./updateUser");

const auth = async (req, res, next) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;
  // We should use this for the token-authentication in future, but for now,
  // it's skipped out due to the development's speed.
  const token = req.header("token") || req.query.token;
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(verified._id);
    const isMatch = await bcrypt.compare(verified.password, user.password);
    console.log("verified", verified, isMatch);
    if (isMatch) {
      req.user = verified;
      next();
    } else {
      res.status(400).json({ message: "Invalid Token" });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = {
  auth,
  addUser,
  allUsers,
  deleteUser,
  login,
  profile,
  register,
  updateUser,
};
