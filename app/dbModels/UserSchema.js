var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    functions: [{
        name: String,
        body: String,
        fullBody: String,
        description: String,
        stars: Number,
        uniqueVisitors: {
            username: String
        },
        visits: Number
    }]
});


module.exports = mongoose.model("Users", UserSchema);
