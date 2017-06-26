(function() {
    angular
        .module('DiceRole')
        .factory("logoutService", logoutService);

    function logoutService($http, $location) {

        return {
            logout: logout
        };

        function logout() {
            var url = "/api/player/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();