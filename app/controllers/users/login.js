const User = require('../../models/user');

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(400).json({
            message: 'all fields are mandatory !'
        })
    } else if (validator.validate(email) === false) {
        res.status(400).json({
            message: 'invalid email format !'
        })
    } else {
        User.findOne(
            {email: email}
        ).then(foundUser => {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, isMatch) {
                    if (!isMatch) {
                        res.status(400).json({message: "password incorrect"});
                    } else {
                        //create Token
                        const token = jwt.sign({_id: foundUser._id}, TOKEN_SECRET);
                        //res.header('token', token).send(token);
                        res.json({user: foundUser, token: token});
                        console.log(foundUser);
                    }
                });
            } else {
                res.status(404).json({message: "User does not exist"})
            }
        })
    }
};

module.exports = login;