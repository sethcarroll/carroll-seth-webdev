(function() {
    angular
        .module('DiceRole')
        .controller('profileController', profileController);

    function profileController(currentPlayer, $location, playerService, $routeParams) {

        var model = this;

        model.user = currentPlayer;
        model.userId = currentPlayer['_id'];


        model.updatePlayer = updatePlayer;
        model.deletePlayer = deletePlayer;
        model.unregister = unregister;
        model.logout = logout;

        function logout() {
            playerService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updatePlayer (id, user) {
            playerService
                .updatePlayer(id, user)
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

        function deletePlayer() {
            playerService
                .deletePlayer(model.userId)
                .then(function() {
                    $location.url('/login');
                });
        }
    }
})();