module.exports = function(app) {

    app.get("/shareFunction", function(req, res) {
        if(req.user) {
            User.findOne({username: req.user.username}, function(err, user) {
                var name = req.query.name;
                var sharedFunction = {};
                user.functions.forEach(function(func) {
                    if(name === func.name) {
                        sharedFunction = func;
                    }
                })

                if({} === sharedFunction) {
                    res.send("Error while fetching the functions");
                }
                else {
                    var newFunction = new SharedFunction();
                    newFunction.name = sharedFunction.name;
                    newFunction.body = sharedFunction.body;
                    newFunction.fullBody = sharedFunction.fullBody;
                    newFunction.originalAuthor = req.user.username;
                    newFunction.stars = sharedFunction.stars;
                    newFunction.views = sharedFunction.visits;

                    newFunction.save();
                    res.send({message:"transaction complete", data: newFunction});
                }
            })
        }
        else {
            res.send("No user logged in");
        }
    })
}
