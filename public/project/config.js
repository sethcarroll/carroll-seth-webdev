(function() {
    angular
        .module("DiceRole")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: './views/home/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkCurrentPlayer
                }
            })
            .when('/login', {
                templateUrl: 'views/player/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: './views/player/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/player/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/logbook', {
                templateUrl: 'views/tools/templates/logbook.view.client.html',
                controller: 'logbookController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/music', {
                templateUrl: 'views/tools/templates/music.view.client.html',
                controller: 'musicController',
                controllerAs: 'model',
                // resolve: {
                //     currentPlayer: checkLoggedIn
                // }
            })
            .when('/dice', {
                templateUrl: 'views/tools/templates/dice.view.client.html',
                controller: 'diceController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/diceanon', {
                templateUrl: 'views/tools/templates/dice-anon.view.client.html',
                controller: 'diceController',
                controllerAs: 'model'
            })
            .when('/player/:userId/campaign', {
                templateUrl: 'views/campaign/templates/campaign-list.view.client.html',
                controller: 'campaignListController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/player/:userId/campaign/new', {
                templateUrl: 'views/campaign/templates/campaign-new.view.client.html',
                controller: 'campaignNewController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/player/:userId/campaign/:campaignId', {
                templateUrl: 'views/campaign/templates/campaign-edit.view.client.html',
                controller: 'campaignEditController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })

            .when('/player/:userId/campaign/:campaignId/character', {
                templateUrl: 'views/character/templates/character-list.view.client.html',
                controller: 'characterListController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/player/:userId/campaign/:campaignId/character/new', {
                templateUrl: 'views/character/templates/character-new.view.client.html',
                controller: 'characterNewController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/player/:userId/campaign/:campaignId/character/:characterId', {
                templateUrl: 'views/character/templates/character-edit.view.client.html',
                controller: 'characterEditController',
                controllerAs: 'model',
                resolve: {
                    currentPlayer: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminPlayersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/players', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminPlayersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/player/:userId', {
                templateUrl: 'views/admin/templates/admin-user-edit.view.client.html',
                controller: 'adminPlayerEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            });
    }

    function checkLoggedIn($q, $location, playerService) {
        var deferred = $q.defer();
        playerService
            .checkLoggedIn()
            .then(function (currentPlayer) {
                if (currentPlayer === '0') {
                    deferred.reject();
                    $location.url('/login'
                    );
                }
                else {
                    deferred.resolve(currentPlayer);
                }
            });
        return deferred.promise;
    }

    function checkCurrentPlayer($q, $location, playerService) {
        var deferred = $q.defer();
        playerService
            .checkLoggedIn()
            .then(function (currentPlayer) {
                if (currentPlayer === '0') {
                    deferred.resolve({});
                }
                else {
                    deferred.resolve(currentPlayer);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, playerService) {
        var deferred = $q.defer();
        playerService
            .checkLoggedIn()
            .then(function(currentPlayer) {
                if(currentPlayer === '0' || currentPlayer.roles.indexOf('ADMIN') === -1) {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentPlayer);
                }
            });
        return deferred.promise;
    }
})();