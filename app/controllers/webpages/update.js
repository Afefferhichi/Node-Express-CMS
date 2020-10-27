const Webpage = require('../../models/webpage');

const update = (req, res) => {
  const {
    wbpFollowers,
    wbpDescription,
    createdBy,
    updatedBy,
  } = req.body;
  if (
    !wbpFollowers ||
    !wbpDescription ||
    !createdBy ||
    !updatedBy
  ) {
    res.json({
      error: 'All fields are mandatory !'
    })
  } else {
    try {
      Webpage.findByIdAndUpdate(req.params.id, {
        wbpFollowers,
        wbpDescription,
        createdBy,
        updatedBy,
        updatedAt: new Date()
      })
        .then(webpage => res.json({success: webpage !== null}))
        .catch(error => res.status(400).json({success: false, error}));
    } catch (error) {
      res.status(400).json({success: false, error});
    }
  }

};

module.exports = update;