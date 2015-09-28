var mongoose = require("mongoose");

var NotificationSchema = mongoose.Schema({
    from: String,
    to: String,
    message: String,
    date: Date
});


module.exports = mongoose.model("Notifications", NotificationSchema);
