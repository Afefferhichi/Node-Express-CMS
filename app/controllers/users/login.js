const User = require('../../models/user');

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.json({
            err: 'all fields are mandatory !'
        })
    } else if (validator.validate(email) === false) {
        res.json({
            err: 'invalid email format !'
        })
    } else {
        User.findOne(
            {email: email}
        ).then(foundUser => {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, isMatch) {
                    if (!isMatch) {
                        res.json({err: "password incorrect"});
                    } else {
                        //create Token
                        const token = jwt.sign({_id: foundUser._id}, TOKEN_SECRET);
                        //res.header('token', token).send(token);
                        res.json({user: foundUser, token: token});
                        console.log(foundUser);
                    }
                });
            } else {
                res.json({err: "User does not exist"})
            }
        })
    }
};

module.exports = login;