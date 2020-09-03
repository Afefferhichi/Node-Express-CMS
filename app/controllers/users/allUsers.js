const User = require('../../models/user');
const allUsers = (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(reason => {
            res.json({err: reason})
        });
};

module.exports = allUsers;