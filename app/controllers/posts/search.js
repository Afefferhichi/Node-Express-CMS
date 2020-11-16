const Post = require("../../models/post");

const search = (req, res) => {
  try {
    Post.searchWebPageByQuery(req.query.q, (error, webpages) => {
      if (error) {
        res.status(400).json({success: false, caught1: true, error});
      } else {
        res.json({success: true, webpages});
      }
    });
  } catch (error) {
    res.status(400).json({success: false, caught2: true, error});
  }
};

module.exports = search;
