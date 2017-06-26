(function() {
    angular
        .module('DiceRole')
        .controller('profileController', profileController);

    function profileController(currentPlayer, $location, playerService, $routeParams) {

        var model = this;

        model.user = currentPlayer;
        model.userId = currentPlayer['_id'];


        model.updatePlayer = updatePlayer;
        model.unregister = unregister;
        model.logout = logout;

        function logout() {
            playerService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updatePlayer (user) {
            playerService
                .updatePlayer(user._id, user)
                .then(function () {
                    model.message = "Updated successfully!";
                });
        }

        function unregister() {
            playerService
                .unregister()
                .then(function() {
                    $location.url('/login');
                });
        }
    }
})();