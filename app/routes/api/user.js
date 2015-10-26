module.exports = function(app, passport, User, SharedFunction) {

    app.get("/api/user", function(req, res) {

        var username = req.query && req.query.username || req.user && req.user.username

        User.findOne({username: username}, function(err, user) {
            if(err) {
                console.log(err);
            }
            if(!user) {
                res.status(404)
                res.end({})
                return
            }
            else {
                res.status(200);
                res.end({
                    id: user._id,
                    username: user.username,
                    functions: user.functions,
                    isLoggedIn: req.user || false
                });
                return
            }
        })

        res.status(404)
        res.end({})
        return
    })

    app.post("/api/user", passport.authenticate("local-signup"), function(req, res) {
        res.sendStatus(200)
        res.end({
            id: req.user._id,
            username: req.user.username,
            functions: req.user.functions,
            isLoggedin: true
        })
    })

    app.post("/api/user/login", passport.authenticate("local-login"), function(req, res) {
        res.sendStatus(200)
        res.end({
            id: req.user._id,
            username: req.user.username,
            isLoggedIn: true
        })
    })
}
