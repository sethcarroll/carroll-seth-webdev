var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    _user: [{type: mongoose.Schema.ObjectId, ref: "PlayerModel"}],
    name: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "message"});

module.exports = messageSchema;
