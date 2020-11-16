const express = require("express");
const router = express.Router();

const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const {uploader} = require("../middlewares/uploader");

const users = require("../controllers/users");
const templates = require("../controllers/templates");
const webpages = require("../controllers/webpages");
const posts = require("../controllers/posts");
const comments = require("../controllers/comments");
const attachments = require("../controllers/attachments");
const {restify, nested_from} = require("../libs/restify");

// Static part

// Users part
router.get("/users", authAdmin, users.list);
router.post("/users", auth, users.create);
router.delete("/users/:id", authAdmin, users.delete);
router.put("/users/:id", [auth, uploader.array("attachments")], users.update);
router.post("/register", users.create);
router.post("/login", users.login);
router.get("/profile", auth, users.profile);
router.put("/changeUserPassword/:id", authAdmin, users.update);
router.put("/setUserEnabled/:id/:enableMode", authAdmin, users.setEnabled);

// Templates part
restify(templates, router, auth);
router.get("/templates/:id/enable", auth, templates.setEnabled);
router.get("/templates/:id/disable", auth, templates.setEnabled);
router.get("/templates/:id/:user_id/make-in-use", auth, templates.makeInUse);
router.get("/templates/:id/:user_id/make-un-use", auth, templates.makeInUse);

// WebPages part
router.post("/webpages/:webpage_id/posts", [auth, uploader.array("attachments")], posts.create);
restify(webpages, router, auth);

// Posts part
router.get("/posts/synchronize", auth, posts.synchronize);
router.get("/posts/search", auth, posts.search);
router.get("/posts/:id/like", auth, posts.like);
router.get("/posts/:id/dislike", auth, posts.like);
router.put("/admin/posts/:id/:visibleMethod", authAdmin, posts.setVisible);
restify(posts, router, auth);

// Comments part
nested_from({name: "posts", id: "post_id"})(restify, comments, router, auth);
router.get("/comments/:id/helpful", auth, comments.helpful);
router.get("/comments/:id/unhelpful", auth, comments.helpful);
router.put(
  "/admin/comments/:id/:visibleMethod",
  authAdmin,
  comments.setVisible
);

// Attachments part
router.get("/attachments", attachments.list);
router.get("/attachments/:id", attachments.show);

module.exports = router;
