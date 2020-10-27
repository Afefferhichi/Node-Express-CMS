const Attachment = require('../../models/attachment');

const list = (req, res) => {
  try {
    const condition = req.query;

    Attachment.find(condition)
      .then((attachments) => {
        res.json({
          success: true,
          attachments,
        });
      })
      .catch((error) => {
        res.json({error});
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

const show = (req, res) => {
  try {
    Attachment
      .findById(req.params.id)
      .then(attachment => {
        try {
          res.download(attachment.path, attachment.originalname);
          res.status(200);
        } catch (error) {
          res.json({error})
        }
      })
      .catch(error => {
        res.json({error})
      });
  } catch (error) {
    res.status(400).json({error});
  }
};


module.exports = {
  list,
  show
}
