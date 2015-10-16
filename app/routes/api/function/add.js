module.exports = function(app, User) {

    app.post("/api/function/add", function(req, res) {

        var funcBody = req.body.body || "";
        var funcName = req.body.name || "";
        var fullBody = req.body.fullBody || "";

        if( funcBody === "" || funcName === "" || fullBody === "" ) {
            res.status(400);
            res.end("error");
            return;
        }

        if(req.user) {
            User.findOne({"username": req.user.username}, function(err, user) {
                if(err) {
                    console.log(err);
                    res.end("fatal error");
                }
                if(!user) {
                    console.log("fatal error, user not found in datbase, but found in session storage");
                    res.end("fatal error");
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
                    //set status
                    res.end("Transaction complete");
                }
            })
        }
        else {
            //set status
            res.end("No user logged in");
        }
    })
}
