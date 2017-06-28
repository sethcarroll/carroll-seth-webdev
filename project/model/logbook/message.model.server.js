var mongoose = require('mongoose');
var messageSchema = require('./message.schema.server');
var messageModel = mongoose.model('MessageModel', messageSchema);

messageModel.createMessage = createMessage;
messageModel.findAllMessages = findAllMessages;
messageModel.deleteMessage = deleteMessage;
messageModel.deleteAllMessages = deleteAllMessages;


module.exports = messageModel;

function createMessage(message) {
    return messageModel.create(message);
}

function findAllMessages(key) {
    return messageModel
        .find({key: key})
        .exec();
}

function deleteMessage(messageId) {
    return messageModel
        .remove({_id: messageId});
}

function deleteAllMessages(key) {
    return messageModel
        .remove({key: key});
}

