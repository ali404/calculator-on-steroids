var User            = require("./dbModels/UserSchema.js");
var SharedFunction  = require("./dbModels/SharedFunctionsSchema.js");

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

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

    app.get("/profile", isAuthenticated, function(req, res) {
        res.render("profile.ejs", {user: req.user});
    })

    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    })

    app.get("/functions", isAuthenticated, function(req, res) {
        SharedFunction.find(function(err, func) {
            res.render("functions.ejs", {user: req.user, functions: func});
        })
    })

    app.get("/addFunction", function(req, res) {
        if(req.user) {
            User.findOne({"username": req.user.username}, function(err, user) {
                if(err) {
                    console.log(err);
                    res.send("fatal error");
                }
                if(!user) {
                    console.log("fatal error, user not found in datbase, but found in session storage");
                    res.send("fatal error");
                }
                else {
                    user.functions.push({
                        name: req.query.name,
                        body: req.query.body,
                        fullBody: req.query.fullBody,
                        description: "",
                        stars: 0,
                        uniqueVisitors: {},
                        visits: 0
                    })
                    user.save();
                    res.send("Transaction complete");
                }
            })
        }
        else {
            res.send("No user logged in");
        }
    })

    app.get("/getFunctions", function(req, res) {
        if(req.user) {
            User.findOne({"username": req.user.username}, function(err, user) {
                if(err) {
                    console.log(err);
                }
                if(!user) {
                    console.log("fatal error, user not found in datbase, but found in session storage");
                }
                else {
                    res.send(user.functions);
                }
            })
        }
        else {
            res.send("No user logged in");
        }
    })

    app.get("/shareFunction", function(req, res) {
        if(req.user) {
            User.findOne({username: req.user.username}, function(err, user) {
                var name = req.query.name;
                var sharedFunction = {};
                user.functions.forEach(function(func) {
                    if(name === func.name) {
                        sharedFunction = func;
                    }
                })

                if({} === sharedFunction) {
                    res.send("Error while fetching the functions");
                }
                else {
                    var newFunction = new SharedFunction();
                    newFunction.name = sharedFunction.name;
                    newFunction.body = sharedFunction.body;
                    newFunction.fullBody = sharedFunction.fullBody;
                    newFunction.originalAuthor = req.user.username;
                    newFunction.stars = sharedFunction.stars;
                    newFunction.views = sharedFunction.visits;

                    newFunction.save();
                    res.send("Transaction complete");
                }
            })
        }
        else {
            res.send("No user logged in");
        }
    })

}
