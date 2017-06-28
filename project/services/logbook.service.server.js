var app = require('../../express');
var messageModel = require('../model/logbook/message.model.server');


app.get('/api/project/messages/:key', findAllMessages);
app.post('/api/project/logmessage', createMessage);
app.delete('/api/project/message/:messageId', deleteMessage);
app.delete('/api/project/messages/:key', deleteAllMessages);

function findAllMessages(req, res) {
    var key = req.params.key;
    messageModel
        .findAllMessages(key)
        .then(function (messages) {
            res.json(messages);
        }, function (err) {
            res.send(err);
        });
}

function createMessage(req, res) {
    var message = req.body;

    messageModel
        .createMessage(message)
        .then(function (message) {
            res.json(message);
        }, function (error) {
            res.sendStatus(404);
        });
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

function deleteAllMessages(req, res) {
    var key = req.params.key;

    messageModel
        .deleteAllMessages(key)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}