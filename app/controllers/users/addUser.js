const User = require('../../models/user');

const addUser = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const telephone = req.body.telephone;
    const organisation = req.body.organisation;
    const role = 'user';
    if (!firstname || !lastname || !email || !password || !address || !telephone || !organisation) {
        res.json({
            err: 'All fields are mandatory !'
        })
    } else if (validator.validate(email) === false) {
        res.json({
            err: 'invalid email format !'
        })
    } else if (password.length < 8) {
        res.json({
            err: 'Mot de passe doit être au moins 8 caractères !'
        })
    } else {
        bcrypt.genSalt(saltRounds, function (erreur, salt) {
            if (erreur) {
                res.json({err: erreur});
            } else {
                bcrypt.hash(password, salt, function (error, hash) {
                    const user = new User({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: hash,
                        address: address,
                        telephone: telephone,
                        organisation: organisation,
                        photo: null,
                        photoLocation: null,
                        role: 'user',
                    });
                    var dataArray = [];
                    User.find({email: email}, function (err, foundData) {
                        dataArray.push(foundData);
                        console.log(dataArray);
                        if (foundData.length > 0) {
                            res.json({
                                err: 'this account with email: ' + email + ' exist'
                            })
                        } else {
                            user.save(function (err, savedUser) {
                                if (err) {
                                    res.json({
                                        err: err
                                    })
                                } else {
                                    res.json({
                                        user: user,
                                        success: 'Success !'
                                    })
                                }
                            });
                        }
                    });
                })
            }
        })
    }
};

module.exports = addUser;