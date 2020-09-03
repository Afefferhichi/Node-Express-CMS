const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controllers');
const posts_controller = require('../controllers/posts_controllers');

const {register, auth, addUser, allUsers, deleteUser, login, profile, updateUser} = users_controller;
const {posts} = posts_controller;

// Users part
router.post('/register', register);
router.post('/login', login);
router.get('/allUsers', auth, allUsers);
router.post('/addUser', auth, addUser);
router.post('/updateUser/:id', auth, updateUser);
router.delete('/deleteUser/:id', auth, deleteUser);
router.get('/profile', auth, profile);
router.get('/posts', posts);


module.exports = router;