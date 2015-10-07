module.exports = function(app, User) {

    app.get("api/function/get/:funcName", function(req, res) {
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
}
