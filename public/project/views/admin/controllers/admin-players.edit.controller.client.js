(function() {
    angular
        .module('DiceRole')
        .controller('adminPlayerEditController', adminPlayerEditController);

    function adminPlayerEditController(currentPlayer, $routeParams, adminService, $location,  playerService, $route) {
        var userId = $routeParams['userId'];
        var model = this;

        function init() {
            adminService
                .findAllPlayers()
                .then(function(players) {
                    model.players = players;
                });

            if (userId === "new") {
                model.isNew = true;
                model.title = "Create Player";
                model.isAdmin = false;
            } else {
                model.isNew = false;
                adminService
                    .findPlayerById(userId)
                    .then(function (user) {
                        model.player = angular.copy(user);
                        model.title = "Edit Player";
                        model.isAdmin = user.roles.indexOf('ADMIN') > -1;
                        console.log(user.roles);
                        console.log(model.isAdmin);
                    });
            }
            model.updatePlayer = updatePlayer;
            model.createPlayer = createPlayer;
            model.deletePlayer = deletePlayer;
            model.deleteAllMessages = deleteAllMessages;
        }
        init();


        function updatePlayer(user) {
            user = checkAdmin(user);
            var id = user._id;
            console.log(user);
            playerService
                .updatePlayer(id, user)
                .then(function () {
                    $route.reload()
                });
        }

        function createPlayer(user) {
            user.roles= ['PLAYER'];
            if (model.isAdmin) {
                user.roles.push('ADMIN');
            }
            playerService
                    .register(user)
                    .then(function (){
                        $location.url('/admin/players');
                    });
        }

        function checkAdmin(user) {
            if (model.isAdmin && (user.roles.indexOf('ADMIN') === -1)) {
                user.roles.push('ADMIN');
            } else if (!model.isAdmin && (user.roles.indexOf('ADMIN') !== -1)) {
                var index = user.roles.indexOf('ADMIN');
                user.roles.splice(index, 1);
            }
            return user;
        }

        function deletePlayer(user) {
            if (confirm("Are you sure you want to delete " + user.username + "'s account?")) {
                adminService
                    .deletePlayer(user)
                    .then(function(response) {
                        var index = model.players.indexOf(user);
                        model.players.splice(index, 1);
                        $location.url('/admin/players');
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
    }
})();