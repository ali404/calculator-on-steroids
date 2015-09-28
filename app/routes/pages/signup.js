module.exports = function(app, passport) {

    app.get("/signup", function(req, res) {
        res.render("signup.ejs", {message: req.flash("message")});
    })

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/signup",
        failureRedirect: "/signup",
        failureFlash: true
    }))
}
