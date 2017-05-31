(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" }
        ];


        var api = {
            createWidget: createWidget,
            findWidgetById : findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        function createWidget(widget, pageId) {
            widget._id = new Date().getTime().toString();
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            var widget = widgets.find(function(widget) {
                return widget["_id"] === widgetId;
            });

            if (typeof widget !== "undefined") {
                var index = widgets.indexOf(widget);
                widgets.splice(index, 1);
            }
        }

        function updateWidget(updatedWidget, widgetId) {
            var outdatedWidget = widgets.find(function(widget) {
                return widget["_id"] === widgetId;
            });

            if (typeof outdatedWidget !== "undefined") {
                var index = widgets.indexOf(outdatedWidget);
                widgets.splice(index, 1, updatedWidget);
            }
        }

        function findWidgetById(widgetId) {
            var widget = widgets.find(function(widget) {
                return widget["_id"] === widgetId;
            });

            if (typeof widget !== "undefined") {
                return widget;
            }
        }

        function findWidgetsByPageId(pageId) {
            return widgets.filter(function (widget) {
                return widget["pageId"] === pageId;
            });
        }
    }
})();