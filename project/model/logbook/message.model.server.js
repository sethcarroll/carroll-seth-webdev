var mongoose = require('mongoose');
var messageSchema = require('./message.schema.server');

messageModel.createMessage = createMessage;
messageModel.findAllMessages = findAllMessages;
messageModel.deleteMessage = deleteMessage;

module.exports = messageModel;

function createMessage(message) {
    return messageModel.create(message);
}

function findAllMessages() {
    return playerModel.find();
}

function deleteCharacter(messageId) {
    return messageModel
        .remove({_id: messageId});
}

