const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controllers');

// Users part
router.post('/register', users_controller.register);
router.post('/login', users_controller.login);
router.get('/allUsers', users_controller.auth, users_controller.allUsers);
router.post('/addUser', users_controller.auth, users_controller.addUser);
router.post('/updateUser/:id', users_controller.auth, users_controller.updateUser);
router.delete('/deleteUser/:id', users_controller.auth, users_controller.deleteUser);
router.get('/profile', users_controller.auth, users_controller.profile);


module.exports = router;