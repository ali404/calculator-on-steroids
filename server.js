var express = require("express")
var app = express()
var http = require("http").Server(app)
var io = require('socket.io')(http)
var cookieParser = require("cookie-parser")
var session = require("express-session")
var morgan = require("morgan")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var passport = require("passport")
var flash = require("connect-flash")
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

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set("view engine", "jade")

require("./config/passport.js")(passport)
require("./app/routes.js")(app, passport)

app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res) {
    res.render("react");
});

io.on("connection", function(socket) {
    console.log("user connected.");

    socket.on("disconnect", function() {
        console.log("user disconnected.");
    })

    socket.on("share function", function(data) {
        io.emit("share function", data);
    })
});

var server = http.listen(3000, function() {
    console.log('App listening on *: 3000');
});

module.exports = server
