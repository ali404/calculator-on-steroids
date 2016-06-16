var bCrypt = require("bcrypt-nodejs");

module.exports = function(app, User) {

    app.get("/api/me", function(req, res) {

        var id = req.session.user && req.session.user.id || ''

        if(!id) {
            res.status(200)
            res.end(JSON.stringify({}))
        }
        else {
            User.findOne({_id: id}, function(err, user) {
                if(err) {
                    console.log(err);
                    res.status(505)
                    res.end("error")
                }
                else if(!user) {
                    res.status(200)
                    res.end(JSON.stringify({}))
                    return
                }
                else {
                    res.status(200)
                    res.end(JSON.stringify({
                        id: user._id,
                        username: user.username,
                        functions: user.functions,
                        isLoggedIn: true
                    }))

                    return
                }
            })
        }
    })

    // signup
    app.post("/api/user", function(req, res) {

        // validation of params
        var username = req.body.username || ''
        var password = req.body.password || ''

        // check params
        if(!username || !password) {
            res.status(400)
            res.end("Something went wrong")
        }
        else {
            User.findOne({username: username}, function(err, user) {
                if(err) {
                    res.status(505)
                    res.end("error")
                }
                else if(user) {
                    // user already exists
                    res.status(400)
                    res.end("User already exists")
                }
                else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.functions = [];

                    newUser.save(function(err) {
                        if(err) {
                            throw err;
                        }

                        res.status(200)
                        res.end("Account created!")
                    })
                }
            })
        }
    })

    app.post("/api/user/login", function(req, res) {

        // save params
        var username = req.body.username || ''
        var password = req.body.password || ''

        // validate params
        if(!username || !password) {
            // username or password didn't pass the validation
            console.log(1)
            res.status(400)
            res.end("User not found")
        }
        else {
            User.findOne({"username": username}, function(err, user) {
                if(err) {
                    res.status(505)
                    res.end("Something went wrong with our servers")
                }
                else if(!user) {
                    // user was not found due to wrong username
                    res.status(400)
                    res.end("User not found")
                }
                else if( !checkPassword(password, user.password) ) {
                    // user found but password mismatch
                    res.status(400)
                    res.end("User not found")
                }
                else {
                    // user found, password match
                    var _user = {
                        id: user._id,
                        username: user.username,
                        functions: user.functions,
                        isLoggedIn: true
                    }

                    req.session.user = _user
                    res.status(200)
                    res.end(JSON.stringify(_user))
                }
            })
        }
    })

    app.delete("/api/user/login", function(req, res) {
        // check if the user is logged in
        if(req.session.user) {
            delete req.session.user

            res.status(200)
            res.end("logout successful")
        }
        else {
            // no user found
            res.status(400)
            res.end("error")
        }
    })
}

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null, function(err, res) {
        console.log(err);
    });
}

var checkPassword = function(password, userPassword) {
    return bCrypt.compareSync(password, userPassword);
}
