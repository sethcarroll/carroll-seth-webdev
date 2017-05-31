(function() {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController(pageService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.createPage = createPage;
        }
        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }
    }
})();