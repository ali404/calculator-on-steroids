var mongoose = require("mongoose");

var SharedFunctionsSchema = mongoose.Schema({
    name: String,
    body: String,
    fullBody: String,
    originalAuthor: String,
    stars: Number,
    views: Number
});

module.exports = mongoose.model("SharedFunctions", SharedFunctionsSchema);
