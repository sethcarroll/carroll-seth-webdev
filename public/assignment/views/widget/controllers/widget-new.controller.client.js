(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createWidget = createWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.websiteId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function createWidget (widgetType) {
            switch (widgetType) {
                case "HEADING":
                    widget =
                        {'_id': '',
                        'name': '',
                        'widgetType': '',
                        'pageId': '',
                        'size': '',
                        'text': ''};
                    break;
                case "IMAGE":
                    widget =
                        {'_id': '',
                        'name': '',
                        'widgetType': '',
                        'pageId': '',
                        'width': '',
                        'url': '',
                        'text': ''};
                    break;
                case "YOUTUBE":
                    widget =
                        {'_id': '',
                        'name': '',
                        'widgetType': '',
                        'pageId': '',
                        'width': '',
                        'url': '',
                        'text': ''};
                    break;
                default:
                    break;
            }
            widget.widgetType = widgetType;
            widget.pageId = model.pageId;
            widgetService
                .createWidget(widget, model.pageId)
                .then(function (widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId
                        + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }
    }
})();