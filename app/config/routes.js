const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/users");
const {
  auth,
  authAdmin,
  allUsers,
  addUser,
  deleteUser,
  login,
  profile,
  register,
  updateUser,
} = users_controller;

const { uploader } = require("../libs/uploader");

const templates = require("../controllers/templates");
const webpages = require("../controllers/webpages");
const posts = require("../controllers/posts");
const comments = require("../controllers/comments");
const attachments = require("../controllers/attachments");
const { restify, nested_from } = require("../libs/restify");

// Static part

// Users part
router.get("/users", authAdmin, allUsers);
router.get("/allUsers", authAdmin, allUsers);
router.post("/addUser", auth, addUser);
router.delete("/deleteUser/:id", authAdmin, deleteUser);
router.delete("/users/:id", authAdmin, deleteUser);
router.post("/login", login);
router.get("/profile", auth, profile);
router.post("/register", register);
router.post("/updateUser/:id", auth, updateUser);
router.put("/users/:id", [auth, uploader.array("attachments")], updateUser);
router.put("/admin/changeUserPassword/:id", authAdmin, updateUser);
router.put(
  "/admin/setUserEnabled/:id/:enableMode",
  authAdmin,
  users_controller.setEnabled
);

// Templates part
restify(templates, router, auth);
router.get("/templates/:id/enable", auth, templates.setEnabled);
router.get("/templates/:id/disable", auth, templates.setEnabled);
router.get("/templates/:id/:user_id/make-in-use", auth, templates.makeInUse);
router.get("/templates/:id/:user_id/make-un-use", auth, templates.makeInUse);

// Webpages part
restify(webpages, router, auth);

// Posts part
restify(posts, router, auth);
router.get("/posts/:id/like", auth, posts.like);
router.get("/posts/:id/dislike", auth, posts.like);
router.put("/admin/posts/:id/:visibleMethod", authAdmin, posts.setVisible);

// Comments part
nested_from({ name: "posts", id: "post_id" })(restify, comments, router, auth);
router.get("/comments/:id/helpful", auth, comments.helpful);
router.get("/comments/:id/unhelpful", auth, comments.helpful);
router.put(
  "/admin/comments/:id/:visibleMethod",
  authAdmin,
  comments.setVisible
);

// Attachments part
router.get("/attachments/:id", attachments.show);

module.exports = router;
