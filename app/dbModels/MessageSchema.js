var mongoose = require("mongoose");

var MessageSchema = mongoose.Schema({
    participants: String,
    messages: [{
        from: String,
        to: String,
        date: Date,
        message: String
    }]
});


module.exports = mongoose.model("Messages", MessageSchema);
