(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController(currentUser, $sce, $routeParams, widgetService) {
        var model = this;

        model.currentUser = currentUser;
        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.trust = trust;
            model.generateYoutubeLink = generateYoutubeLink;

            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function trust(url) {
            return $sce.trustAsHtml(url);
        }

        function generateYoutubeLink(url) {
            var embedUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('=');
            embedUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }
})();