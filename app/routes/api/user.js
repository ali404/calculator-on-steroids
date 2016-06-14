var bCrypt = require("bcrypt-nodejs");

module.exports = function(app, passport, User, SharedFunction) {

    app.get("/api/user/", function(req, res) {

        var username = (req.query && req.query.username) || (req.user && req.user.username)

        User.findOne({username: username}, function(err, user) {
            if(err) {
                console.log(err);
            }
            if(!user) {
                res.status(200)
                res.end("no user found")
                return
            }
            else {
                var _isLoggedIn
                if(req.query && req.user && req.query.username === req.user.username) {
                    _isLoggedIn = true
                }
                else if(req.user && req.user.username) {
                    _isLoggedIn = true
                }

                res.status(200)
                res.end(JSON.stringify({
                    id: user._id,
                    username: user.username,
                    functions: user.functions,
                    isLoggedIn: _isLoggedIn
                }))
                return
            }
        })
        .then(function() {
            res.status(404)
            res.end("error 2 : " + username)
            return
        })
    })

    // signup
    app.post("/api/user", function(req, res) {

        // validation of params
        var username = req.body.username || ""
        var password = req.body.password || ""

        // check params
        if(!username || !password) {
            console.log(1)
            res.status(404)
            res.end("Something went wrong")
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

    app.post("/api/user/login", passport.authenticate("local-login"), function(req, res) {
        res.status(200)
        res.end(JSON.stringify({
            id: req.user._id,
            username: req.user.username,
            functions: req.user.functions,
            isLoggedIn: true
        }))
        return
    })

    app.delete("/api/user/login", function(req, res) {
        if(req.user && req.user.username) {
            req.logout()
            res.sendStatus(200)
            res.end("logout success")
        }
        else {
            res.sendStatus(404)
            res.end("error")

            return
        }
    })
}

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null, function(err, res) {
        console.log(err);
    });
}
