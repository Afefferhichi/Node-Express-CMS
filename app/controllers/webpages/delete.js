const WebPage = require('../../models/webpage');

const deleteWebPage = (req, res) => {
  try {
    WebPage
      .findByIdAndDelete(req.params.id)
      .then((deletedWebPage) => {
        if (deletedWebPage) {
          res.json({success: true, deletedWebPage})
        } else {
          res.json({success: false, error_code: 'NO_EXIST'})
        }
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

module.exports = deleteWebPage;
