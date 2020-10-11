const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users');
const {auth, allUsers, addUser, deleteUser, login, profile, register, updateUser} = users_controller;

const {uploader} = require('../libs/uploader');

const templates = require('../controllers/templates')
const webpages = require('../controllers/webpages')
const posts = require('../controllers/posts')
const comments = require('../controllers/comments')
const attachments = require('../controllers/attachments')

// Users part
router.get('/allUsers', auth, allUsers);
router.post('/addUser', auth, addUser);
router.delete('/deleteUser/:id', auth, deleteUser);
router.post('/login', login);
router.get('/profile', auth, profile);
router.post('/register', register);
router.post('/updateUser/:id', auth, updateUser);


// Templates part
router.post('/templates', auth, templates.create);
router.delete('/templates/:id', auth, templates.delete);
router.get('/templates', auth, templates.list);
router.get('/templates/:id', auth, templates.show);
router.put('/templates/:id', auth, templates.update);

// Webpages part
router.post('/webpages', auth, webpages.create);
router.delete('/webpages/:id', auth, webpages.delete);
router.get('/webpages', auth, webpages.list);
router.get('/webpages/:id', auth, webpages.show);
router.put('/webpages/:id', auth, webpages.update);

// Posts part
router.post('/posts', [auth, uploader.array('attachments')], posts.create);
router.delete('/posts/:id', auth, posts.delete);
router.get('/posts', auth, posts.list);
router.get('/posts/:id', auth, posts.show);
router.get('/posts/:id/like', auth, posts.like);
router.get('/posts/:id/dislike', auth, posts.like);
router.put('/posts/:id', [auth, uploader.array('attachments')], posts.update);

// Comments part
router.post('/posts/:post_id/comments', [auth, uploader.array('attachments')], comments.create);
router.delete('/comments/:id', auth, comments.delete);
router.get('/posts/:post_id/comments', auth, comments.list);
router.get('/comments/:id', auth, comments.show);
router.get('/comments/:id/helpful', auth, comments.helpful);
router.get('/comments/:id/unhelpful', auth, comments.helpful);
router.put('/comments/:id', [auth, uploader.array('attachments')], comments.update);

// Attachments part
router.get('/attachments/:id', auth, attachments.show);


module.exports = router;