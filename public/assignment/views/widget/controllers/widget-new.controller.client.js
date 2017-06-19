(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController(currentUser, $routeParams, widgetService, $location) {
        var model = this;

        model.currentUser = currentUser;
        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createWidget = createWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function createWidget (widgetType) {
            switch (widgetType) {
                case "HEADING":
                    widget =  {'name': '', 'type': 'HEADING', '_page': '', 'size': '', 'text': '', 'order': 10000};
                    break;
                case "HTML":
                    widget =  {'name': '', 'type': 'HTML', '_page': '', 'text': '', 'order': 10000};
                    break;
                case "TEXT":
                    widget =  {'name': '', 'type': 'TEXT', '_page': '', 'rows': '', 'placeholder': '', 'formatted': '', 'order': 10000};
                    break;
                case "IMAGE":
                    widget =  {'name': '', 'type': 'IMAGE', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 10000};
                    break;
                case "YOUTUBE":
                    widget =  {'name': '', 'type': 'YOUTUBE', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 10000};
                    break;
                default:
                    break;
            }
            // switch (widgetType) {
            //     case "HEADING":
            //         widget =
            //             {'_id': '',
            //             'name': '',
            //             'widgetType': 'HEADING',
            //             'pageId': '',
            //             'size': '',
            //             'text': '',
            //                 'order': 10000};
            //         break;
            //     case "HTML":
            //         widget =
            //             {'name': '',
            //             'widgetType': 'HTML',
            //             '_page': '',
            //             'text': '',
            //             'order': 10000};
            //         break;
            //     case "IMAGE":
            //         widget =
            //             {'_id': '',
            //             'name': '',
            //             'widgetType': 'IMAGE',
            //             'pageId': '',
            //             'width': '',
            //             'url': '',
            //             'text': '',
            //                 'order': 10000};
            //         break;
            //     case "TEXT":
            //         widget =  {'name': '',
            //             'widgetType': 'TEXT',
            //             '_page': '',
            //             'rows': '',
            //             'placeholder': '',
            //             'formatted': '',
            //             'order': 10000};
            //         break;
            //     case "YOUTUBE":
            //         widget =
            //             {'_id': '',
            //             'name': '',
            //             'widgetType': 'YOUTUBE',
            //             'pageId': '',
            //             'width': '',
            //             'url': '',
            //             'text': '',
            //                 'order': 10000};
            //         break;
            //     default:
            //         break;
            // }
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