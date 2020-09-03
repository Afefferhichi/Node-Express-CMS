const User = require('../../models/user');

const profile = (req, res) => {
    if (req.headers.token) {
        var token = req.headers.token;
        try {
            var decoded = jwt.decode(token);

        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var data = decoded._id;
        console.log(data)
        // Fetch the user by id
        User.findById(data).then(function (user) {
            // Do something with the user
            res.json(user);
        });
    } else {
        return res.status(401).send('unauthorized');
    }
}

module.exports = profile;