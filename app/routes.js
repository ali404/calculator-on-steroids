var User            = require("./dbModels/UserSchema.js");
var SharedFunction  = require("./dbModels/SharedFunctionSchema.js");

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = function(app, passport) {

    require("./routes/pages/home.js")(app);
    require("./routes/pages/signup.js")(app, passport);
    require("./routes/pages/login.js")(app, passport);
    require("./routes/pages/logout.js")(app);
    require("./routes/pages/profile.js")(app, isAuthenticated);
    require("./routes/pages/sharedFunctions.js")(app, passport, SharedFunction, isAuthenticated);
    require("./routes/pages/userChat.js")(app, isAuthenticated);
    require("./routes/pages/userProfile.js")(app, User);

    //ajax call only(TODO: have to define a way for these to only be accessed through ajax);
    require("./routes/ajax/addFunction.js")(app, User);
    require("./routes/ajax/getFunctions.js")(app, User);
    require("./routes/ajax/shareFunction.js")(app, User);

    app.get("/sendMessage", isAuthenticated, function(req, res) {
        //nothing
    })

}
