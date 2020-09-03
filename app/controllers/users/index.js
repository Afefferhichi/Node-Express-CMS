const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'UwawGKsnVz1EBbP2tHpt';

const allUsers = require('./allUsers');
const addUser = require('./addUser');
const deleteUser = require('./deleteUser');
const login = require('./login');
const profile = require('./profile');
const register = require('./register');
const updateUser = require('./updateUser');


const auth = (req, res, next) => {
    // We should use this for the token-authentication in future, but for now,
    // it's skipped out due to the development's speed.
    next();
    return;
    const token = req.header('token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = {
    auth,
    addUser,
    allUsers,
    deleteUser,
    login,
    profile,
    register,
    updateUser
};