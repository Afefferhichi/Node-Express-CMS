const Post = require("../../models/post");

const search = (req, res) => {
  try {
    Post.search({
        query_string: {
          query: req.query.q || "test"
        }
      },
      {
        hydrate: true
      },
      (error, posts) => {
        if (error) {
          res.status(400).json({if_error: true, error});
        } else {
          res.json({success: true, posts: posts.hits.hits, _posts: posts.hits.hits.map(hit => hit._source)})
        }
      });
  } catch (error) {
    res.status(400).json({caught: true, error});
  }
};

module.exports = search;
