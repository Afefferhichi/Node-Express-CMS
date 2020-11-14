const WebPage = require('../../models/webpage');

const update = (req, res) => {
  const {
    description,
    design,
    html,
  } = req.body;
  if (
    !description
  ) {
    res.json({
      error: 'All fields are mandatory !'
    })
  } else {
    try {
      WebPage
        .findById(req.params.id)
        .then((webPage) => {
          webPage.description = description;
          webPage.design = design;
          webPage.html = html;
          webPage.updatedAt = new Date();
          webPage.save((error, updatedWebPage) => {
            if (error) {
              res.status(400).json({success: false, error});
            } else {
              res.json({success: true, updatedWebPage})
            }
          })
        });
    } catch (error) {
      res.status(400).json({success: false, error});
    }
  }

};

module.exports = update;
