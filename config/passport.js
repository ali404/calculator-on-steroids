var LocalStrategy = require("passport-local").Strategy;
var User = require("../app/dbModels/UserSchema.js");
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use("local-login", new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({"username": username}, function(err, user) {
                if(err) {
                    return done(err);
                }

                if(!user) {
                    return done(null, false, req.flash("message", "user doesn't exist"));
                }

                if( !checkPassword(password, user.password) ) {
                    return done(null, false, req.flash("message", "password doesn't match"));
                }

                return done(null, user);
            })
        })
    }))
}

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null, function(err, res) {
        console.log(err);
    });
}

var checkPassword = function(password, userPassword) {
    return bCrypt.compareSync(password, userPassword);
}
