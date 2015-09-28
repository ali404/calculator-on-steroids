module.exports = function(app, User) {

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
}
