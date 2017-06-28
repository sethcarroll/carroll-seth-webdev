(function() {
    angular
        .module('DiceRole')
        .controller('adminPageController', adminPageController);

    function adminPageController(currentPlayer, adminService, playerService, logbookService, $location) {
        var model = this;

        function init() {
            model.logout = logout;
            model.currentPlayer = currentPlayer;

            adminService
                .findAllPlayers()
                .then(function(players) {
                    model.players = players;
                });

            model.deletePlayer = deletePlayer;
            model.deleteAllMessages = deleteAllMessages;
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

        function deleteAllMessages() {
            var key = 'key';
            logbookService
                .deleteAllMessages(key)
                .then(function (){
                });
        }

        function logout() {
            playerService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();