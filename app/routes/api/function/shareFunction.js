module.exports = function(app, User) {

    app.post("/api/functions/share/", function(req, res) {

        var URLfuncName = req.params.funcName;

        if(req.user) {

            var sharedFunction = {};
            User.findOne({username: req.user.username}, function(err, user) {
                user.function.forReach(function(func) {
                    if( func.name === URLfuncName && false === func.isShared ) {
                        sharedFuncton = func
                    }
                })

                if( {} === sharedFunction ) {
                    //nothing else matters
                }
                else {
                    var newFunction = new SharedFunction();
                    newFunction.name = sharedFunciton.name;
                    newFunction.name = sharedFunction.name;
                    newFunction.body = sharedFunction.body;
                    newFunction.fullBody = sharedFunction.fullBody;
                    newFunction.originalAuthor = req.user.username;
                    newFunction.stars = sharedFunction.stars;
                    newFunction.views = sharedFunction.visits;

                    newFunction.save();
                }
            })
        }
        else {
            //nothing else matters
        }
        //check if funcName exists and isn't shared yet
        //if not, share it and emit message
    })
}
