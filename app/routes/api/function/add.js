module.exports = function(app, User) {

    app.post("/api/function/add", function(req, res) {

        var funcBody = req.body.body;
        var funcName = req.body.name;
        var fullBody = req.body.fullBody;

        if( funcBody || funcName || fullBody ) {
            res.status(400);
            res.send("error");
            return;
        }

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
                        name: funcName,
                        body: funcBody,
                        fullBody: fullBody,
                        description: "",
                        stars: 0,
                        uniqueVisitors: {},
                        visits: 0
                    })
                    user.save();
                    res.send("Transaction complete");
                    return;
                }
            })
        }
        else {
            res.send("No user logged in");
        }
    })
}
