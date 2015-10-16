module.exports = function(app, User) {

    app.post("/api/function", function(req, res, next) {

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
                    console.log(err)
                    res.status(500)
                    res.end("fatal error")
                    next()
                }
                if(!user) {
                    console.log("fatal error, user not found in datbase, but found in session storage");
                    res.status(500);
                    res.end("fatal error")
                    next()
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
                    user.save()
                    res.status(200)
                    res.end("Transaction complete")
                    next()
                }
            })
        }
        else {
            res.status(400)
            res.end("No user logged in")
            next()
        }
    })

    app.get("/api/function", function(req, res, next) {

        var funcName = req.query.func || "";
        var userName = req.query.user || "";

        if( "" !== funcName && "" === userName ) {
            if( req.user ) {
                parseMode = "singular";
            }
            else {
                res.status(400);
                console.log("1");
                res.end("if not logged in, userName parameter is required!");
                next();
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
            res.status(400);
            console.log("2")
            res.end("invalid/none parameters entered")
            next()
        }

        if(req.user) {
            User.findOne({"username": req.user.username}, function(err, user) {
                if(err) {
                    console.log(err)
                }
                if(!user) {
                    console.log("fatal error, user not found in datbase, but found in session storage")
                }
                else {
                    //res.type("application/json");
                    if( "singular" === parseMode ) {
                        user.functions.forEach(function(func) {
                            if( funcName === func.name ) {
                                res.status(200)
                                res.end(func)
                                next()
                            }
                        })
                        res.status(204)
                        res.end({})
                        next()
                    }
                    else if( "all" === parseMode ) {
                        res.status(200)
                        res.end(user.functions)
                        next()
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
                                res.status(200)
                                res.end(func)
                                next()
                            }
                        })
                    }
                    else if( "all" === parseMode ) {
                        res.status(200)
                        res.end(user.functions)
                        next()
                    }
                }
            })
        }
        //if it still is here, then an error occured;
        res.status(400)
        console.log("3")
        res.end("parameters correct, values not found in DB")
        next()
    })
}
