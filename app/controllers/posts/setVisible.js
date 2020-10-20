const Post = require("../../models/post");

const setVisiblePost = (req, res) => {
  try {
    const setVisibledMethod = req.params.visibleMethod;
    Post.findById(req.params.id).then((foundPost) => {
      if (foundPost) {
        foundPost.visible = setVisibledMethod === "visible";
        foundPost.save((error, updatedPost) => {
          if (error) {
            res.status(400).json({ error });
          } else {
            if (updatedPost) {
              res.json({ success: true, updatedPost });
            } else {
              res.json({ success: false, error_code: "NO_EXIST" });
            }
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = setVisiblePost;