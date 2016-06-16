module.exports = function(app, User) {

    app.post("/api/function", function(req, res) {

        var funcBody = req.body.functionBody || "";
        var funcName = req.body.functionName || "";

        if(!funcBody || !funcName) {
            res.status(400)
            res.end("error")
        }
        else {
            var fullBody = "var " + funcName + " = " + funcBody

            if(req.session.user) {
                User.findOne({'username': req.session.user.username}, function(err, user) {
                    if(err) {
                        console.log(err)
                        res.status(500)
                        res.end("fatal error")
                        return
                    }
                    if(!user) {
                        // the user is in session but not in database
                        // this is a big error
                        console.log('>>>>>>> Internal server error');
                        res.status(500)
                        res.end("Internal server error")
                        return
                    }
                    else {
                        var _func = {
                            funcName: funcName,
                            funcBody: funcBody,
                            fullBody: fullBody,
                            description: ""
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
        }
    })

    app.get('/api/functions', function(req, res) {
        var id = req.session.user && req.session.user.id || ''

        if(!id) {
            res.status(200)
            res.end(JSON.stringify([]))
        }
        else {
            User.findOne({'_id': id}, function(err, user) {
                if(err) {
                    res.status(500)
                    res.end('Internal server error')

                    return
                }
                else if(!user) {
                    res.status(400)
                    res.end('>>>>>>> Internal server error')

                    return
                }
                else {
                    var functions = user.functions

                    res.status(200)
                    res.end(JSON.stringify(functions))
                }
            })
        }
    })
}
