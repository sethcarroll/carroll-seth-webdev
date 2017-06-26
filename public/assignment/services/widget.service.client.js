(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);

    function widgetService ($routeParams, $http) {

        this.createWidget = createWidget;
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.reorderWidget = reorderWidget;

        function createWidget (widget, pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http
                .post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWidgetsForPage (pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById (widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget (widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http
                .put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget (widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function reorderWidget (start, end) {
            var url = "/page/"+ $routeParams['pid'] + "/widget?start=" + start + "&end=" + end;
            return $http
                .put(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();