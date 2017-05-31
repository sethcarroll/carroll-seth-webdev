(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(websiteService, $location, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websites = websiteService.findWebsitesByUser(model.userId);

        function init() {
            model.createWebsite = createWebsite;
        }
        init();

        function createWebsite(website) {
            websiteService.createWebsite(model.userId, website);
            $location.url('/user/'+model.userId+'/website/');
        }
    }
})();
