var mongoose = require('mongoose');
var characterSchema = require('./character.schema.server');
var characterModel = mongoose.model('CharacterModel', characterSchema);
var campaignModel = require('../campaign/campaign.model.server');

characterModel.createCharacter = createCharacter;
characterModel.findAllCharactersForCampaign = findAllCharactersForCampaign;
characterModel.findCharacterById = findCharacterById;
characterModel.updateCharacter = updateCharacter;
characterModel.deleteCharacter = deleteCharacter;

module.exports = characterModel;

function createCharacter(campaignId, character) {
    character._campaign = campaignId;
    return characterModel.create(character)
        .then(function (character) {
            return campaignModel.addCharacter(campaignId, character._id)
        });
}

function findAllCharactersForCampaign(campaignId) {
    return characterModel.find({_campaign: campaignId})
        .populate('_campaign')
        .exec();
}

function findCharacterById(characterId) {
    return characterModel.findById(characterId);
}

function updateCharacter(characterId, newCharacter) {
    return characterModel.update({_id: characterId}, {$set: newCharacter});
}

function deleteCharacter(characterId) {
    return characterModel
        .remove({_id: characterId})
        .then(function (status) {
            return campaignModel
                .deleteCharacter(characterId);
        });
}

