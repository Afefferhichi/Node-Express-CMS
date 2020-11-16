const WebPage = require('../../models/webpage');

const deleteWebPage = (req, res) => {
  try {
    WebPage.findById(req.params.id)
      .then(async (deletedWebPage) => {
        if (!deletedWebPage) {
          res.json({success: false, error_code: 'NO_EXIST'})
        } else {
          await deletedWebPage.remove();
          if (deletedWebPage) {
            res.json({success: true, deletedWebPage})
          } else {
            res.json({success: false, error_code: 'NO_EXIST'})
          }
        }
      })
  } catch (error) {
    res.status(400).json({success: false, error});
  }
};

module.exports = deleteWebPage;
