var app = require('../../express');
var userModel = require('../model/user/user.model.server');

app.get    ('/api/user/:userId', findUserById);
app.get    ('/api/user', findUserByUsername);
app.get    ('/api/user', findUserByCredentials);
app.post   ('/api/user', createUser);
app.put    ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);

function createUser (req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserByUsername (req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function () {
            user = null;
            res.send(user);
        });

}

function findUserByCredentials (req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(404);
        });
}

function findUserById (req, res) {
    userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function updateUser (req, res) {
    var user = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteUser (req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

