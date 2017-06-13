var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.send(err);
        });
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        }, function (err) {
            res.send(err);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.send(err);
        });
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel
        .deleteWebsite(websiteId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}