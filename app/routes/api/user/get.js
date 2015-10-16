module.exports = function(app, User) {

    app.get("/api/user/get", function(req, res) {

        var username = req.query.name || "";

        User.findOne({username: username}, function(err, user) {
            if(err) {
                console.log(err);
            }
            if(!user) {
                console.log("fatal error, user not found in datbase, but found in session storage");
                res.redirect("/");
            }
            else {
                res.status(200);
                res.end({username: user.username, functions: user.functions});
            }
        })
    })
}
