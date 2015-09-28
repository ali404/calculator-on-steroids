module.exports = function(app, isAuthenticated) {
    app.get("/profile", isAuthenticated, function(req, res) {
        var string = "/user/" + req.user.username;
        res.redirect(string);
    })
}
