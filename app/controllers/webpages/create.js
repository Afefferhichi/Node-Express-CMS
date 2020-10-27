const Webpage = require("../../models/webpage");

const create = (req, res) => {
  const {wbpFollowers, wbpDescription, createdBy, updatedBy} = req.body;
  if (!wbpDescription) {
    res.json({
      error: "All fields are mandatory !",
    });
  } else {
    const webpage = new Webpage({
      wbpFollowers,
      wbpDescription,
      createdBy: new Date(),
      updatedBy: new Date(),
    });
    try {
      webpage.save((error, createdWebpage) => {
        if (error) {
          res.json({error});
        } else {
          res.json({
            createdWebpage,
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
