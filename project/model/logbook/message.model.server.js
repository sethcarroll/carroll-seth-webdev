var mongoose = require('mongoose');
var messageSchema = require('./message.schema.server');
var messageModel = mongoose.model('MessageModel', messageSchema);

messageModel.createMessage = createMessage;
messageModel.findAllMessages = findAllMessages;
messageModel.deleteMessage = deleteMessage;

module.exports = messageModel;

function createMessage(message) {
    return messageModel.create(message);
}

function findAllMessages() {
    return messageModel.find();
}

function deleteMessage(messageId) {
    return messageModel
        .remove({_id: messageId});
}

