(function () {
    angular
        .module('DiceRole')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            checkLoggedIn: checkLoggedIn,
            register: register,
            unregister: unregister
        };

        return api;

        function login(username, password){
            var url = "/api/player/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http
                .post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/player/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/player/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister() {
            var url ="/api/player/unregister";
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                }, function(error) {
                });
        }

        function checkLoggedIn() {
            var url = "/api/player/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser (user) {
            var url = "/api/player";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername (username) {
            var url = "/api/player?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials (username, password) {
            var url = "/api/player?username=" + username + "&password=" + password;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById (userId) {
            var url = "/api/player/" + userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser (userId, user) {
            var url = "/api/player/" + userId;
            return $http
                .put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser (userId) {
            var url = "/api/player/" + userId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();