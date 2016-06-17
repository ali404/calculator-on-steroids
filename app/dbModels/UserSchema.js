var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    functions: [{
        functionName: String,
        functionBody: String,
        fullBody: String,
        description: String
    }]
});


module.exports = mongoose.model("Users", UserSchema);
