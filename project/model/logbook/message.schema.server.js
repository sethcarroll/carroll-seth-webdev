var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    _user: [{type: mongoose.Schema.ObjectId, ref: "PlayerModel"}],
    text: String,
    dateCreated: {type: Date, default: Date.now},
    key: String,
    name: String
}, {collection: "message"});

module.exports = messageSchema;
