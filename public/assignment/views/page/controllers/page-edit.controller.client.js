(function() {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService, $location) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.updatePage = updatePage;
        model.deletePage = deletePage;


        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                    model.oldPages = angular.copy(model.pages);
                });
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                    model.oldPage = angular.copy(model.page);
                });
        }

        init();

        function updatePage(pageId, page) {
            pageService
                .updatePage(pageId, page)
                .then(function (){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });

        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function (){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();