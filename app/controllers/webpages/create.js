const WebPage = require("../../models/webpage");

const create = (req, res) => {
  const {
    description, design, html } = req.body;
  if (!description) {
    res.json({
      error: "All fields are mandatory !",
    });
  } else {
    const webpage = new WebPage({
      description,
      design,
      html,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user._id,
      updatedBy: req.user._id
    });
    try {
      webpage.save((error, createdWebPage) => {
        if (error) {
          res.json({error});
        } else {
          res.json({
            createdWebPage,
            success: true,
          });
        }
      });
    } catch (error) {
      res.status(400).json({error});
    }
  }
};

module.exports = create;
