(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController(currentUser, $routeParams) {
        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser['_id'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
    }
})();