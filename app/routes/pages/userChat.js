module.exports = function(app, isAuthenticated) {

    app.get("/chat/:username", isAuthenticated, function(req, res) {
        User.findOne({username: req.params.username}, function(err, user) {

        })
    })
}
