(function() {
    angular
        .module('DiceRole')
        .controller('adminPlayersController', adminPlayersController);

    function adminPlayersController(currentPlayer, adminService, logoutService) {
        var model = this;

        function init() {
            model.logout = logoutService.logout;
            model.currentPlayer = currentPlayer;

            adminService
                .findAllPlayers()
                .then(function(players) {
                    model.players = players;
                });

            model.deletePlayer = deletePlayer;
        }
        init();
        function deletePlayer(user) {
            if (confirm("Are you sure you want to delete " + user.username + "'s account?")) {
                adminService
                    .deletePlayer(user)
                    .then(function(response) {
                        var index = model.players.indexOf(user);
                        model.players.splice(index, 1);
                    });
            }

        }
    }
})();