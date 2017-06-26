var mongoose = require('mongoose');
var campaignSchema = require('./campaign.schema.server');
var campaignModel = mongoose.model('CampaignModel', campaignSchema);
var playerModel = require('../player/player.model.server');

campaignModel.createCampaignForPlayer = createCampaignForPlayer;
campaignModel.findAllCampaignsForPlayer = findAllCampaignsForPlayer;
campaignModel.findAllCampaigns = findAllCampaigns;
campaignModel.findCampaignById = findCampaignById;
campaignModel.updateCampaign = updateCampaign;
campaignModel.deleteCampaign = deleteCampaign;
campaignModel.addCharacter = addCharacter;
campaignModel.deleteCharacter = deleteCharacter;

module.exports = campaignModel;

function createCampaignForPlayer(userId, campaign) {
    campaign._user = userId;
    return campaignModel.create(campaign)
        .then(function (campaign) {
            return playerModel.addCampaign(userId, campaign._id);
        });
}

function findAllCampaignsForPlayer(userId) {
    return campaignModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findAllCampaigns(world) {
    return campaignModel
        .find({_world: world})
        .populate('_world')
        .exec();
}

function findCampaignById(campaignId) {
    return campaignModel.findById(campaignId);
}

function updateCampaign(campaignId, newCampaign) {
    return campaignModel.update({_id: campaignId}, {$set: newCampaign});
}

function deleteCampaign(campaignId) {
    return campaignModel
        .remove({_id: campaignId})
        .then(function (status) {
            return playerModel
                .deleteCampaign(campaignId);
        })
}

function addCharacter(campaignId, characterId) {
    return campaignModel
        .findById(campaignId)
        .then(function (campaign) {
            campaign.characters.push(characterId);
            return campaign.save();
        });
}

function deleteCharacter(characterId) {
    return campaignModel
        .find({characters:characterId})
        .then(function (campaigns) {
            var campaign = campaigns[0];
            var index = campaign.characters.indexOf(characterId);
            campaign.characters.splice(index, 1);
            return campaign.save();
        });
}