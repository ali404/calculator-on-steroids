var LocalStrategy = require("passport-local").Strategy;
var User = require("../app/dbModels/UserSchema.js");

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use("local-signup", new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({"username": username}, function(err, user) {
                if(err) {
                    return done(err);
                }
                if(user) {
                    return done(null, false, {message: "User already exists"});
                }
                else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = password;

                    newUser.save(function(err) {
                        if(err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }
    ));
}
