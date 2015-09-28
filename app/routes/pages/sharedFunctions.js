module.exports = function(app, passport, SharedFunction, isAuthenticated) {

    app.get("/functions", isAuthenticated, function(req, res) {
        SharedFunction.find(function(err, func) {
            res.render("functions.ejs", {user: req.user, functions: func});
        })
    })
}
