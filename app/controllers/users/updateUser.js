const User = require('../../models/user');

const updateUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.firstname = req.body.firstname,
                user.lastname = req.body.lastname,
                user.email = req.body.email,
                user.adresse = req.body.adresse,
                user.telephone = req.body.telephone,
                user.organisation = req.body.organisation;

            user.save()
                .then(() => res.json({success: 'User updated!'}))
                .catch(err => res.json({err: err}));
        })
        .catch(err => res.status(400).json({err: err}));
};

module.exports = updateUser;