var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
    _campaign: [{type: mongoose.Schema.ObjectId, ref: "CampaignModel"}],
    name: String,
    title: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "character"});

module.exports = characterSchema;
