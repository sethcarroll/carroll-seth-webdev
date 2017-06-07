(function() {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController(pageService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage (page) {
            page.websiteId = model.websiteId;
            pageService
                .createPage(page)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                });
        }
    }
})();