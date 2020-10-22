const User = require("../../models/user");

const setEnabledUser = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      let setEnabledMethod = req.params.enableMode;
      const user = await User.findById(req.params.id);
      user.enabled = setEnabledMethod === "enable";
      user.save((error, updatedUser) => {
        if (error) {
          res.status(400).json({ error });
        } else {
          if (updatedUser) {
            res.json({ success: true, updatedUser });
          } else {
            res.json({ success: false, error_code: "NO_EXIST" });
          }
        }
      });
    } else {
      res.status(400).json({
        code: "ACCESS_DENIED",
        message: "Access denied",
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = setEnabledUser;
