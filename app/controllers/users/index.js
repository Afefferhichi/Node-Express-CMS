const jwt = require('jsonwebtoken');

const allUsers = require('./allUsers');
const addUser = require('./addUser');
const deleteUser = require('./deleteUser');
const login = require('./login');
const profile = require('./profile');
const register = require('./register');
const updateUser = require('./updateUser');


const auth = (req, res, next) => {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    // We should use this for the token-authentication in future, but for now,
    // it's skipped out due to the development's speed.
    const token = req.header('token') || req.query.token;
    if (!token) return res.status(401).json({message: 'Access Denied'});

    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({message: 'Invalid Token'});
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
    updateUser,
};