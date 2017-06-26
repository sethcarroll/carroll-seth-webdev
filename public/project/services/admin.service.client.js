(function() {
    angular
        .module('DiceRole')
        .factory('adminService', adminService);

    function adminService($http) {

        return {
            findAllPlayers : findAllPlayers,
            deletePlayer : deletePlayer,
            findPlayerById : findPlayerById,
            updatePlayer : updatePlayer,
            createPlayer : createPlayer
        };

        function findAllPlayers() {
            var url = "/api/admin/players";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function deletePlayer(user) {
            var url = "/api/admin/player/"+user._id;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findPlayerById(userId) {
            var url = "/api/admin/player/"+userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updatePlayer(user) {
            var url = "/api/admin/player/"+user._id;
            return $http.put(url, user)
                .then(function(response){
                    return response.data;
                });
        }

        function createPlayer(user) {
            var url = "/api/admin/player";
            return $http.post(url, user)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();