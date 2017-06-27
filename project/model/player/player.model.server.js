var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var playerSchema = require('./player.schema.server');
var playerModel = mongoose.model('PlayerModel', playerSchema);

playerModel.createPlayer = createPlayer;
playerModel.findPlayerById = findPlayerById;
playerModel.findAllPlayers = findAllPlayers;
playerModel.findPlayerByUsername = findPlayerByUsername;
playerModel.findPlayerByCredentials = findPlayerByCredentials;
playerModel.updatePlayer = updatePlayer;
playerModel.deletePlayer = deletePlayer;
playerModel.addCampaign = addCampaign;
playerModel.deleteCampaign = deleteCampaign;
playerModel.findPlayerByFacebookId = findPlayerByFacebookId;

module.exports = playerModel;

function createPlayer(user) {
    user.password = bcrypt.hashSync(user.password);
    return playerModel.create(user);
}

function findPlayerById(userId) {
    return playerModel.findById(userId);
}

function findAllPlayers() {
    return playerModel.find();
}

function findPlayerByUsername(username) {
    return playerModel.findOne({username: username});
}

function findPlayerByCredentials(username, password) {
    return playerModel
        .findOne({username: username})
        .then(function(user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        });
}

function updatePlayer(userId, newPlayer) {
    newPlayer.password = bcrypt.hashSync(newPlayer.password);
    return playerModel.update({_id: userId}, {
        $set: {
            firstName: newPlayer.firstName,
            lastName: newPlayer.lastName,
            email: newPlayer.email,
            phone: newPlayer.phone,
            birthday: newPlayer.birthday,
            password: newPlayer.password
        }
    })
}

function deletePlayer(userId) {
    return playerModel.remove({_id: userId});
}

function addCampaign(userId, campaignId) {
    return playerModel
        .findById(userId)
        .then(function (user) {
            user.campaigns.push(campaignId);
            return user.save();
        });
}

function deleteCampaign(campaignId) {
    return playerModel
        .find({campaigns:campaignId})
        .then(function (users) {
            var user = users[0];
            var index = user.campaigns.indexOf(campaignId);
            user.campaigns.splice(index, 1);
            return user.save();
        });
}

function findPlayerByFacebookId(facebookId) {
    return playerModel
        .findOne({'facebook.id': facebookId});
}