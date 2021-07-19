var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    username: String,
    message : String,
    written_On : {type:Date,default:Date.now}
})

module.exports = mongoose.model('chat',chatSchema);