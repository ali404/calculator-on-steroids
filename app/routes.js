var User            = require("./dbModels/UserSchema.js");
var SharedFunction  = require("./dbModels/SharedFunctionSchema.js");

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = function(app, passport) {

    // TODO
    // uncomment or delete when finish API and CLIENT communication

    //server freezes when this block is used
    //app.use(function(req,res,next) {
    //    res.locals.user = req.user || {}
    //})

    // require("./routes/pages/home.js")(app)
    // require("./routes/pages/signup.js")(app, passport)
    // require("./routes/pages/login.js")(app, passport)
    // require("./routes/pages/logout.js")(app)
    // require("./routes/pages/profile.js")(app, isAuthenticated)
    // require("./routes/pages/sharedFunctions.js")(app, passport, SharedFunction, isAuthenticated)
    // require("./routes/pages/userChat.js")(app, isAuthenticated)
    // require("./routes/pages/userProfile.js")(app, User)


    require("./routes/api/function.js")(app, User)
    require("./routes/api/function.share.js")(app, User, SharedFunction)
    require("./routes/api/user.js")(app, passport, User, SharedFunction)

}
