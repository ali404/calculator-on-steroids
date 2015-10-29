module.exports = function(app, passport, User, SharedFunction) {

    app.get("/api/user/", function(req, res) {

        var username = (req.query && req.query.username) || (req.user && req.user.username)

        User
        .findOne({username: username}, function(err, user) {
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

    app.post("/api/user", passport.authenticate("local-signup"), function(req, res) {
        res.status(200)
        res.end({
            id: req.user._id,
            username: req.user.username,
            functions: req.user.functions,
            isLoggedin: true
        })
        return
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
            req.logout();
            res.sendStatus(200)
            res.end("logout success")
            return
        }
        res.sendStatus(404)
        res.end("error")
        return
    })
}
