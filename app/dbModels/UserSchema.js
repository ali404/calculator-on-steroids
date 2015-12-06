var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    functions: [{
        funcName: String,
        funcBody: String,
        fullBody: String,
        description: String,
        stars: Number,
        uniqueVisitors: {
            username: String
        },
        visits: Number,
        isShared: Boolean
    }]
});


module.exports = mongoose.model("Users", UserSchema);
