(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvDirectives', sortableDir);

    function sortableDir(widgetService) {
        var start = -1;
        var end = -1;
        function linkFunc(scope, element){
            element.sortable({
                axis: "y",
                scroll: false,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    widgetService
                        .reorderWidget(start, end);

                }
            })
        }
        return {
            link: linkFunc
        }
    }
})();