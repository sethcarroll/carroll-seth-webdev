(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init() {
            findWebsitesByUser();
        }
        init();

        function findWebsitesByUser() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
    }
})();