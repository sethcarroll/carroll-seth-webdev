(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.websites = websiteService.findWebsitesByUser(model.userId);
        model.website = angular.copy(websiteService.findWebsiteById(model.websiteId));

        model.updateWebsite = function() {
            websiteService.updateWebsite(model.websiteId, model.website);
            $location.url('/user/'+model.userId+'/website');
        };

        model.deleteWebsite = function() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+model.userId+'/website');
        };
    }
})();
