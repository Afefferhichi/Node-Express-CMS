const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users');
const posts_controller = require('../controllers/posts_controllers');

// const {register, auth, addUser, allUsers, deleteUser, login, profile, updateUser} = users_controller;
const {auth, allUsers, addUser, deleteUser, login, profile, register, updateUser} = users_controller;
const {posts} = posts_controller;

// Users part
router.get('/allUsers', auth, allUsers);
router.post('/addUser', auth, addUser);
router.delete('/deleteUser/:id', auth, deleteUser);
router.post('/login', login);
router.get('/profile', auth, profile);
router.post('/register', register);
router.post('/updateUser/:id', auth, updateUser);


// router.get('/posts', posts);


module.exports = router;