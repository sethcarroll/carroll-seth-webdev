(function() {
    angular
        .module('DiceRole')
        .controller('profileController', profileController);

    function profileController(currentPlayer, $location, playerService, $routeParams) {

        var model = this;

        model.user = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);


        model.updatePlayer = updatePlayer;
        model.deletePlayer = deletePlayer;
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
                    $location.url('/admin/players');
                });
        }

        function deletePlayer() {
            if (confirm("Are you sure you want to delete your account?")) {
            playerService
                .deletePlayer(model.userId)
                .then(function() {
                    $location.url('/login');
                });
            }
        }
    }
})();