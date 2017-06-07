var app = require('../../express');

app.get    ('/api/user/:userId', findUserById);
app.get    ('/api/user', findUserByUsername);
app.get    ('/api/user', findUserByCredentials);
app.post   ('/api/user', createUser);
app.put    ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",   email: "awonder@gmail.com"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",   email: "bob@gmail.com"},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",   email: "charly@gmail.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",  email: "jannunzi@neu.edu"}
];


function createUser (req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    user.created = new Date();
    users.push(user);
    res.send(user);
}

function findUserByUsername (req, res) {
    var username = req.query['username'];
    for (var u in users) {
        var user = users[u];
        if (user.username === username) {
            res.json(user);
            return;
        }
    }
    user = null;
    res.send(user);
}

function findUserByCredentials (req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    for (var u in users) {
        var user = users[u];
        if (user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}

// all parameters send to req
function findUserById (req, res) {
    userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function updateUser (req, res) {
    var user = req.body;
    var userId = req.params.userId;
    for (var u in users) {
        if (users[u]._id === userId) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
}

function deleteUser (req, res) {
    var userId = req.params.userId;
    var user = users.find(function (user) {
       return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}

