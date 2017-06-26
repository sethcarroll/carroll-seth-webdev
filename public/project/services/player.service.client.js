(function () {
    angular
        .module('DiceRole')
        .factory('playerService', playerService);

    function playerService($http) {

        var api = {
            createUser: createUser,
            findPlayerByUsername: findPlayerByUsername,
            findPlayerByCredentials: findPlayerByCredentials,
            findPlayerById: findPlayerById,
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
            var url = "/api/project/login";
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
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/project/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister() {
            var url ="/api/project/unregister";
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                }, function(error) {
                });
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser (user) {
            var url = "/api/project";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPlayerByUsername (username) {
            var url = "/api/project?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPlayerByCredentials (username, password) {
            var url = "/api/project?username=" + username + "&password=" + password;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPlayerById (userId) {
            var url = "/api/project/" + userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser (userId, user) {
            var url = "/api/project/" + userId;
            return $http
                .put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser (userId) {
            var url = "/api/project/" + userId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();