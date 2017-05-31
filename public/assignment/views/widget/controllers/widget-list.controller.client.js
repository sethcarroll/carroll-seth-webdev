(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.trust = trust;
            model.generateYoutubeLink = generateYoutubeLink;
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function trust(url) {
            return $sce.trustAsHtml(url);
        }

        function generateYoutubeLink(url) {
            var embed = 'https://www.youtube.com/embed/';
            var parts = url.split('/');
            var videoId = parts[parts.length - 1];
            link = embed + videoId;
            return $sce.trustAsResourceUrl(link);
            console.log(link);
        }
    }
})();