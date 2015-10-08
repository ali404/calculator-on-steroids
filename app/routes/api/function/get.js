module.exports = function(app, User) {

    app.get("/api/function/get", function(req, res) {

        var funcName = req.query.func || "";
        var userName = req.query.user || "";

        if( "" !== funcName && "" === userName ) {
            if( req.user ) {
                parseMode = "singular";
            }
            else {
                //res.status(400);
                console.log("1");
                res.send("if not logged in, userName parameter is required!");
                //res.end();
            }
        }
        else if( "" !== funcName && "" !== userName ) {
            parseMode = "singularFromUser";
        }
        else if( "" === funcName && "" !== userName ) {
            parseMode = "all";
        }
        else if( "" === funcName && "" === userName && req.user ) {
            parseMode = "all";
        }
        else {
            //res.status(400);
            console.log("2");
            res.send("invalid/none parameters entered");
            //res.end();
        }

        if(req.user) {
            User.findOne({"username": req.user.username}, function(err, user) {
                if(err) {
                    console.log(err);
                }
                if(!user) {
                    console.log("fatal error, user not found in datbase, but found in session storage");
                }
                else {
                    //res.type("application/json");
                    if( "singular" === parseMode ) {
                        user.functions.forEach(function(func) {
                            if( funcName === func.name ) {
                                //res.status(200);
                                res.send(func);
                                //res.end();
                            }
                        })
                        //res.status(204);
                        res.send({});
                        //res.end();
                    }
                    else if( "all" === parseMode ) {
                        //res.status(200);
                        res.send(user.functions);
                        //res.end();
                    }
                }
            })
        }
        else {
            User.findOne({"username": userName}, function(err, user) {
                if(err) {
                    //show an error
                }
                if(!user) {
                    //show err
                }
                else {
                    //res.type("application/json");
                    if( "singularFromUser" === parseMode ) {
                        user.functions.forEach(function(func) {
                            if( funcName === func.name ) {
                                //res.status(200);
                                res.send(func);
                                //res.end();
                            }
                        })
                    }
                    else if( "all" === parseMode ) {
                        //res.status(200);
                        res.send(user.functions);
                        //res.end();
                    }
                }
            })
        }
        //if it still is here, then an error occured;
        //res.status(400);
        console.log("3");
        res.send("parameters correct, values not found in DB");
        //res.end();
    })
}
