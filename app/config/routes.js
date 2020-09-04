const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users');
const {auth, allUsers, addUser, deleteUser, login, profile, register, updateUser} = users_controller;

const templates = require('../controllers/templates')
const webpages = require('../controllers/webpages')
const posts = require('../controllers/posts')

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
router.post('/posts', auth, posts.create);
router.delete('/posts/:id', auth, posts.delete);
router.get('/posts', auth, posts.list);
router.get('/posts/:id', auth, posts.show);
router.put('/posts/:id', auth, posts.update);

module.exports = router;