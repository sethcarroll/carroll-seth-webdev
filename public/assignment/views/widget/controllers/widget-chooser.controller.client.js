(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController($routeParams) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
    }
})();