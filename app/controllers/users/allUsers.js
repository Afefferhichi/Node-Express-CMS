const User = require('../../models/user');
const allUsers = (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(reason => {
            res.status(500).json({message: reason})
        });
};

module.exports = allUsers;