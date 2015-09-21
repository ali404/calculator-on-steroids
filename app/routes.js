module.exports = function(app, passport) {

    app.get("/", function(req, res) {
        res.render("calculator.ejs");
    });

    app.get("/signup", function(req, res) {
        res.render("signup.ejs");
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }));

};
