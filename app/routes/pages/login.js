module.exports = function(app, passport) {

    app.get("/login", function(req, res) {
        res.render("login.ejs", {message: req.flash("message")});
    })

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }))
}
