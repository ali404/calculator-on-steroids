var User            = require("./dbModels/UserSchema.js");
var SharedFunction  = require("./dbModels/SharedFunctionSchema.js");

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = function(app, passport) {

    require("./routes/api/function.js")(app, User)
    require("./routes/api/function.share.js")(app, User, SharedFunction)
    require("./routes/api/user.js")(app, passport, User, SharedFunction)
}
