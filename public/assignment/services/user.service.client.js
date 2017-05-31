(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    // makes all of the data private to this factory/service
    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "awonder@gmail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bmarley@gmail.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cgarcia@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@gmail.com" }
        ];


        var api = {
            createUser:  createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            user._id = (new Date()).getTime().toString();
            users.push(user);
        }

        function findUserById(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            if (typeof user !== "undefined") {
                return user;
            }
        }

        function findUserByUsername(username) {
            var user = users.find(function(user) {
                return user.username === username;
            });
            if (typeof user !== "undefined") {
                return user;
            }
        }

        function findUserByCredentials(username, password) {
            var user = users.find(function(user) {
                return user.username === username && user.password === password;
            });

            if (typeof user !== "undefined") {
                  return user;
            }
        }

        function updateUser(userId, updatedUser) {
            var outdatedUser = users.find(function(user) {
                return userID === user['_id'];
            });
            if (typeof outdatedUser !== "undefined") {
                var index = users.indexOf(outdatedUser);
                users.splice(index, 1, updatedUser);
            }
        }

        function deleteUser(userId) {
            var user = users.find(function(user) {
                return user['_id'] === userId;
            });
            if (typeof user !== "undefined") {
                var index = users.indexOf(user);
                users.splice(index,1);
            }
        }
    }
})();