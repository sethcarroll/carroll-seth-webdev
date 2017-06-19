(function() {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController(currentUser, $routeParams, pageService) {
        var model = this;

        model.currentUser = currentUser;
        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

    }
})();