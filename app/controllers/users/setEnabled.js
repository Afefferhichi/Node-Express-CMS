const User = require("../../models/user");

const setEnabledUser = (req, res) => {
  try {
    if (req.user.role === "admin") {
      let setEnabledMethod = req.params.enableMode;
      User.findByIdAndUpdate(req.params.id, {
        enabled: setEnabledMethod === "enable",
      }).then((updatedUser) => {
        if (updatedUser) {
          res.json({ success: true, updatedUser });
        } else {
          res.json({ success: false, error_code: "NO_EXIST" });
        }
      });
    } else {
        res.status(400).json({ 
            code: 'ACCESS_DENIED',
            message: 'Access denied'
         });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = setEnabledUser;
