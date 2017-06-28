var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
    _campaign: [{type: mongoose.Schema.ObjectId, ref: "CampaignModel"}],
    name: String,
    age: String,
    height: String,
    weight: String,
    class: String,
    race: String,
    level: String,
    backstory: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "character"});

module.exports = characterSchema;
