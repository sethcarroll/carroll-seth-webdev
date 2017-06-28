var mongoose = require('mongoose');

var campaignSchema = mongoose.Schema({
    _user: [{type: mongoose.Schema.ObjectId, ref: "PlayerModel"}],
    world: String,
    name: String,
    description: String,
    characters: [{type: mongoose.Schema.ObjectId, ref: "CharacterModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "campaign"});

module.exports = campaignSchema;