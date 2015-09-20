module.exports = function(app, passport) {

    //homepage, list all the blogs available
    app.get("/", function(req, res) {
        res.send("Calculator on steroids");
    });
};
