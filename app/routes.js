module.exports = function(app, passport) {

    app.get("/", function(req, res) {
        res.render("calculator.ejs");
    })

    app.get("/signup", function(req, res) {
        res.render("signup.ejs", {message: req.flash("message")});
    })

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/signup",
        failureRedirect: "/signup",
        failureFlash: true
    }))

    app.get("/login", function(req, res) {
        res.render("login.ejs", {message: req.flash("message")});
    })

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }))

    app.get("/profile", isAuthenticated, function(res, req) {
        req.render("user.ejs", {user: req.user});
    })

}

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}
