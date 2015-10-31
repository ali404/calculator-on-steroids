module.exports = function(app, User) {

    app.post("/api/function", function(req, res) {

        var funcBody = req.body.funcBody || "";
        var funcName = req.body.funcName || "";

        if( funcBody === "" || funcName === "") {
            res.status(400)
            res.end("error")
            return
        }

        var fullBody = "var " + funcName + " = " + funcBody

        if(req.user) {
            User.findOne({"username": req.user.username}, function(err, user) {
                if(err) {
                    console.log(err)
                    res.status(500)
                    res.end("fatal error")
                    return
                }
                if(!user) {
                    console.log("fatal error, user not found in datbase, but found in session storage");
                    res.status(500)
                    res.end("fatal error")
                    return
                }
                else {
                    var _func = {
                        funcName: funcName,
                        funcBody: funcBody,
                        fullBody: fullBody,
                        description: "",
                        stars: 0,
                        uniqueVisitors: {},
                        visits: 0
                    }
                    user.functions.push(_func)
                    user.save()

                    res.status(200)
                    res.end(JSON.stringify(_func))
                    return
                }
            })
        }
        else {
            res.status(400)
            res.end("No user logged in")
            return
        }
    })

    app.get("/api/function", function(req, res) {

        var funcName = req.query.func || "";
        var userName = req.query.user || "";

        if( "" !== funcName && "" === userName ) {
            if( req.user ) {
                parseMode = "singular";
                userName = req.user.username
            }
            else {
                res.status(400)
                console.log("1")
                res.end("if not logged in, userName parameter is required!")
                return
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
            userName = req.user.username
        }
        else {
            res.status(400)
            console.log("2")
            res.end("invalid/none parameters entered")
            return
        }

        if(req.user) {
            User.findOne({"username": userName}, function(err, user) {
                if(err) {
                    res.status(500)
                    console.log(err)
                    res.end("error")
                    return
                }
                if(!user) {
                    res.status(500)
                    console.log("fatal error, user not found in datbase, but found in session storage")
                    return
                }
                else {
                    if( "singular" === parseMode ) {
                        user.functions.forEach(function(func) {
                            if( funcName === func.funcName ) {
                                res.status(200)
                                res.end(JSON.stringify(func))
                                return
                            }
                        })
                        res.status(204)
                        res.end({})
                        return
                    }
                    else if( "all" === parseMode ) {
                        res.status(200)
                        res.end(JSON.stringify(user.functions))
                        return
                    }
                }
            })
            .then(function() {
                //if it still is here, then an error occured;
                res.status(400)
                console.log("3")
                res.end("parameters correct, values not found in DB")
                return
            })
        }
        else {
            User.findOne({"username": userName}, function(err, user) {
                if(err) {
                    res.status(500)
                    console.log(err)
                    return
                }
                if(!user) {
                    res.status(500)
                    console.log(err)
                    return
                }
                else {
                    if( "singularFromUser" === parseMode ) {
                        user.functions.forEach(function(func) {
                            if( funcName === func.funcName ) {
                                res.status(200)
                                res.end(JSON.stringify(func))
                                return
                            }
                        })
                    }
                    else if( "all" === parseMode ) {
                        res.status(200)
                        res.end(JSON.stringify(user.functions))
                        return
                    }
                }
            })
            .then(function() {
                //if it still is here, then an error occured;
                res.status(400)
                console.log("3")
                res.end("parameters correct, values not found in DB")
                return
            })
        }
    })
}
