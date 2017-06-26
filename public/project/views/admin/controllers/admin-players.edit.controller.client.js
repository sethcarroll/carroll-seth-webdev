(function() {
    angular
        .module('DiceRole')
        .controller('adminPlayerEditController', adminPlayerEditController);

    function adminPlayerEditController(currentPlayer, $routeParams, adminService, $location) {
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
                    });
            }

            model.updatePlayer = updatePlayer;
            model.createPlayer = createPlayer;
        }
        init();


        function updatePlayer(user) {
            checkAdmin(user);
            adminService
                .updatePlayer(user)
                .then(function(response) {
                    $location.url('/admin/players');
                });
        }

        function createPlayer(user) {
            user.roles= ['PLAYER'];
            if (model.isAdmin) {
                user.roles.push('ADMIN');
            }
            adminService
                .createPlayer(user)
                .then(function(response) {
                    $location.url('/admin/players');
                });
        }

        function checkAdmin(user) {
            if (model.isAdmin && (user.roles.indexOf('ADMIN') === -1)) {
                user.roles.push('ADMIN');
            } else if (!model.isAdmin && (user.roles.indexOf('ADMIN') >-1)) {
                var index = user.roles.indexOf('ADMIN');
                user.roles.splice(index, 1);
            }
            return user;
        }
    }
})();