var User = require("./dbModels/UserSchema.js");

var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = function(app) {

    require("./routes/api/function.js")(app, User)
    require("./routes/api/user.js")(app, User)
}
