module.exports = function(app, User, SharedFunction) {

    app.post("/api/function/share/", function(req, res) {

        var funcName = req.body.name || "";

        if( funcName === "" ) {
            res.status(400);
            res.end("error");
            return;
        }

        if(req.user) {

            var sharedFunction = {};
            User.findOne({username: req.user.username}, function(err, user) {
                user.functions.forEach(function(func) {
                    if( func.name === funcName && false === func.isShared ) {
                        sharedFuncton = func
                    }
                })

                if( {} === sharedFunction ) {
                    res.end("Error while fetching the functions");
                }
                else {
                    var newFunction = new SharedFunction();
                    newFunction.name = sharedFunction.name;
                    newFunction.name = sharedFunction.name;
                    newFunction.body = sharedFunction.body;
                    newFunction.fullBody = sharedFunction.fullBody;
                    newFunction.originalAuthor = req.user.username;
                    newFunction.stars = sharedFunction.stars;
                    newFunction.views = sharedFunction.visits;

                    newFunction.save();
                    res.end("Transaction complete");
                }
            })
        }
        else {
            //nothing else matters
            res.end("No user logged in");
        }
    })
}
