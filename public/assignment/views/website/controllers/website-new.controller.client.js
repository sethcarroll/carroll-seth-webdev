(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(currentUser, websiteService, $location, $routeParams) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser['_id'];
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite (website) {
            website.developerId = model.userId;
            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/');
                });
        }
    }
})();
