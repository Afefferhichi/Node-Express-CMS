const User = require('../../models/user');

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: 'User deleted.'}))
        .catch(err => res.status(400).json({err: err}));
};

module.exports = deleteUser;