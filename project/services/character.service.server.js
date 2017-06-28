var app = require('../../express');
var characterModel = require('../model/character/character.model.server');

app.post('/api/campaign/:campaignId/:userId/character', createCharacter);
app.get('/api/campaign/:campaignId/character', findAllCharactersForCampaign);
app.get('/api/character/:characterId', findCharacterById);
app.put('/api/character/:characterId', updateCharacter);
app.delete('/api/character/:characterId', deleteCharacter);

function createCharacter(req, res) {
    var character = req.body;
    var campaignId = req.params.campaignId;
    var userId = req.params.userId;

    characterModel
        .createCharacter(userId, campaignId, character)
        .then(function (character) {
            res.json(character);
        }, function (err) {
            res.send(err);
        });
}

function findAllCharactersForCampaign(req, res) {
    var campaignId = req.params.campaignId;

    characterModel
        .findAllCharactersForCampaign(campaignId)
        .then(function (characters) {
            res.json(characters);
        }, function (err) {
            res.send(err);
        });
}

function findCharacterById(req, res) {
    var characterId = req.params.characterId;

    characterModel
        .findCharacterById(characterId)
        .then(function (character) {
            res.json(character);
        }, function (err) {
            res.send(err);
        });
}

function updateCharacter(req, res) {
    var character = req.body;
    var characterId = req.params.characterId;

    characterModel
        .updateCharacter(characterId, character)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteCharacter(req, res) {
    var characterId = req.params.characterId;

    characterModel
        .deleteCharacter(characterId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}