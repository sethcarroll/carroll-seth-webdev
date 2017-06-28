var app = require('../../express');
var campaignModel = require('../model/campaign/campaign.model.server');

app.post('/api/player/:userId/campaign', createCampaign);
app.get('/api/player/:userId/campaign', findAllCampaignsForPlayer);
app.get('/api/campaign/:world', findAllCampaigns);
app.get('/api/campaign/find/:campaignId', findCampaignById);
app.put('/api/campaign/update/:campaignId', updateCampaign);
app.delete('/api/campaign/:campaignId', deleteCampaign);

function createCampaign(req, res) {
    var campaign = req.body;
    var userId = req.params.userId;

    campaignModel
        .createCampaignForPlayer(userId, campaign)
        .then(function (campaign) {
            res.json(campaign);
        }, function (err) {
            res.send(err);
        });
}

function findAllCampaignsForPlayer(req, res) {
    var userId = req.params.userId;
    campaignModel
        .findAllCampaignsForPlayer(userId)
        .then(function (campaigns) {
            res.json(campaigns);
        }, function (err) {
            res.send(err);
        });
}

function findAllCampaigns(req, res) {
    var world = req.params.world;
    campaignModel
        .findAllCampaigns(world)
        .then(function (campaigns) {
            res.json(campaigns);
        }, function (err) {
            res.send(err);
        });
}

function findCampaignById(req, res) {
    var campaignId = req.params.campaignId;

    campaignModel
        .findCampaignById(campaignId)
        .then(function (campaign) {
            res.json(campaign);
        }, function (err) {
            res.send(err);
        });
}

function updateCampaign(req, res) {
    var campaign = req.body;
    var campaignId = req.params.campaignId;

    campaignModel
        .updateCampaign(campaignId, campaign)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteCampaign(req, res) {
    var campaignId = req.params.campaignId;

    campaignModel
        .deleteCampaign(campaignId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}