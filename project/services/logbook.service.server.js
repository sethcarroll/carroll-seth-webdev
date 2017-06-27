var app = require('../../express');
var messageModel = require('../model/logbook/message.model.server');


app.get('/api/project/messages', findAllMessages);
app.post('/api/project/logmessage', createMessage);
app.delete('/api/project/message/:messageId', deleteMessage);

function createMessage(req, res) {
    var message = req.body;

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