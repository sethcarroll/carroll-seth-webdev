var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function createUser(user) {
    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username: username})
        .then(function(user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        });
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {
        $set: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    })
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function deleteWebsite(websiteId) {
    return userModel
        .find({websites:websiteId})
        .then(function (users) {
            var user = users[0];
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({"google.id" : googleId});

}