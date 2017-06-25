const app = require('../../../../express');

app.get('/lecture/ejs/crud/user', getUserList);
app.get("/lecture/ejs/crud/user/:userId/delete", deleteUser);
app.get("/lecture/ejs/crud/user/:userId/select", selectUser);
app.post('/lecture/ejs/crud/user', createUser);

var userModel = require('../../../../assignment/model/user/user.model.server.js');
var scope;

function getUserList(req,res) {
    userModel
        .findAllUsers()
        .then(function(users) {
            var scope = {
                users: users
            };
    res.render('user', scope);
});
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.redirect('/lecture/ejs/crud/user');
            });
}

function selectUser(req, res) {
    var scope = {};
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            scope.selectedUser = user;
            userModel
                .findAllUsers()
                .then(function(users) {
                    scope.users = users;
                    res.render('/lecture/ejs/crud/user', scope);
                });
        });
}

function createUser(req, res) {
    userModel
        .createUser(req.body)
        .then(function (user) {
            res.redirect('/lecture/ejs/crud/user');
        });
}