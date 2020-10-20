const Post = require("../../models/post");

const list = (req, res) => {
  try {
    const condition = req.query;
    if (req.user.role !== "admin") {
      condition["visible"] = true;
      // condition["author"] = String(req.user._id);
    }
    Post.find(condition)
      .populate("author")
      .populate("attachments", "filename originalname _id")
      .populate({
        path: "comments",
        model: "Comment",
        select: "cmtValue cmtHelpfuls cmtUnHelpfuls postId visible email _id",
        // ...(req.user.role !== "admin" ? { match: { visible: true } } : {}),
        populate: [
          {
            path: "attachments",
            mode: "Attachment",
            select: "filename originalname _id",
          },
          {
            path: "author",
            mode: "User",
            select: "firstname lastname photo email _id",
          },
        ],
      })
      .then((posts) => {
        res.json({
          success: true,
          posts,
        });
      })
      .catch((error) => {
        res.json({ error });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const show = (req, res) => {
  try {
    Post.findById(req.params.id)
      .populate("attachments", "filename originalname _id")
      .populate(
        "comments",
        "cmtValue cmtHelpfuls cmtUnHelpfuls postId visible email _id"
      )
      .populate("author")
      .populate({
        path: "comments",
        model: "Comment",
        select: "cmtValue cmtHelpfuls cmtUnHelpfuls postId visible email _id",
        populate: [
          {
            path: "attachments",
            mode: "Attachment",
            select: "filename originalname _id",
          },
          {
            path: "author",
            mode: "User",
            select: "firstname lastname photo _id",
          },
        ],
      })
      .then((post) => {
        res.json({
          success: true,
          post,
        });
      })
      .catch((error) => {
        res.json({ error });
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  list,
  show,
};
