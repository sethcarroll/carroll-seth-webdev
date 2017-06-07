(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                    model.oldWebsites = angular.copy(model.websites);
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                    model.oldWebsite = angular.copy(model.website);
                });
        }
        init();

        function updateWebsite (websiteId, website) {
            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function deleteWebsite (websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();
