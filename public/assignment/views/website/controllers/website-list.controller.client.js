(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController(currentUser, $routeParams, websiteService) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser['_id'];

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();
    }
})();