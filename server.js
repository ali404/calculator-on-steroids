var express = require("express")
var app = express()
var http = require("http").Server(app)

var cookieParser = require("cookie-parser")
var session = require("express-session")
var morgan = require("morgan")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")

var configDB = require("./config/database.js")

mongoose.connect(configDB.url)

app.use(morgan("dev"))
app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
            secret: "anystringoftext",
            saveUninitialized: true,
            resave: true
        }))

app.set("view engine", "jade")

require("./app/routes.js")(app)

app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res) {
    res.render("react");
});

var port = Number(process.env.PORT || 3000)

var server = http.listen(port, function() {
    console.log('App listening on :' + port);
});

module.exports = server
