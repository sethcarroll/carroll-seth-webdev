var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    campaigns: [{type: mongoose.Schema.ObjectId, ref: "CampaignModel"}],
    facebook: {
        id: String,
        token: String
    },
    roles: [{type: String,
        default: 'PLAYER',
        enum: ['PLAYER', 'ADMIN']}]
}, {collection: "player"});

module.exports = playerSchema;
