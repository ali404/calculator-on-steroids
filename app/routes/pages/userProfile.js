module.exports = function(app, User) {

    app.get("/user/:username", function(req, res) {
        if( req.params.username === "login" ) {
            return;
        }
        var data = {};
        User.findOne({username: req.params.username}, function(err, user) {
            if(err) {
                console.log(err);
            }
            if(!user) {
                console.log("fatal error, user not found in datbase, but found in session storage");
                res.redirect("/");
            }
            else {
                data.name = user.username;
                data.functions = user.functions;
                data.isLoggedIn = false;
                if(req.user) {
                    data.isSelf = user.username === req.user.username ? true : false;
                    data.isLoggedIn = true;
                }
                else {
                    data.isSelf = false;
                }
                console.log(data);
            }
        }).then(function() {
            res.render("profile.ejs", {user: data});
        })
    })
}
