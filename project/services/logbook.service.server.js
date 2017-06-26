var app = require('../../express');
var characterModel = require('../model/logbook/logbook.model.server');

app.post('/api/logmessage', createMessage);
app.get('/api/messages', findAllMessages);
app.delete('/api/message/:messageId', deleteMessage);

function createMessage(req, res) {
    var character = req.body;
    var campaignId = req.params.campaignId;

    messageModel
        .createMessage(message)
        .then(function (message) {
            res.json(message);
        }, function (err) {
            res.send(err);
        });
}

function findAllMessages(req, res) {
    messageModel
        .findAllMessages()
        .then(function(messages) {
            res.json(messages);
        }, function(error) {
            res.sendStatus(404);
        })
}

function deleteMessage(req, res) {
    var messageId = req.params.messageId;

    messageModel
        .deleteMessage(messageId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}