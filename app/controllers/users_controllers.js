

<<<<<<< HEAD
// Check JWT TOKEN
const auth = (req, res, next)  => {
    // We should use this for the token-authentication in future, but for now,
    // it's skipped out due to the development's speed.
    //next();
    //return;
    const token = req.header('token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

const register = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const cnfPassword = req.body.cnfPassword;
    const address = req.body.address;
    const telephone = req.body.telephone;
    const organisation = req.body.organisation;
    const role = 'user';
    if (!firstname || !lastname || !email || !password || !cnfPassword || !address || !telephone || !organisation) {
        res.status(400).json({
            message: 'All fields are mandatory !'
        })
    } else if (validator.validate(email) === false) {
        res.status(400).json({
            message: 'Invalid email format !'
        })
    } else if (password.length < 8) {
        res.status(400).json({
           message: 'Password should be at least 8 character !'
        })
    } else if (!password === (cnfPassword)) {
        res.status(400).json({
            message: 'password and cnfPassword dont match !'
        })
    } else {
        bcrypt.genSalt(saltRounds, function (erreur, salt) {
            if (erreur) {
                res.status(500).json({mrssage: erreur});
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
                                err: 'this account ' + email + ' exist'
                            })
                        } else {
                            user.save(function (err, savedUser) {
                                if (err) {
                                    res.json({
                                        err: err
                                    })
                                } else {
                                    res.json({
                                        user: savedUser,
                                        success: 'Congrats your registration has been approved !'
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


// LOGIN
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
                res.status(400).json({message: "User does not exist"})
            }
        })
    }
};

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
        res.status(400).json({
            message: 'All fields are mandatory !'
        })
    } else if (validator.validate(email) === false) {
        res.status(400).json({
            message: 'invalid email format !'
        })
    } else if (password.length < 8) {
        res.status(400).json({
            message: 'Mot de passe doit être au moins 8 caractères !'
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

const allUsers = (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(reason => {
            res.json({err: reason})
        });
};

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

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: 'User deleted.'}))
        .catch(err => res.status(400).json({err: err}));
};

const profile =  (req, res) => {
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
        User.findById(data).then(function(user){
            // Do something with the user
            res.json(user);
        });
    }
}
=======
>>>>>>> 73b2f6cc7a5899f7f292670e27bf04821f655aa8
const users_controller = {
    register,
    login,
    auth,
    allUsers,
    addUser,
    updateUser,
    deleteUser,
    profile
};


module.exports = users_controller;