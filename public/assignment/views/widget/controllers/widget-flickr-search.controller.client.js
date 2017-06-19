(function() {
    angular
        .module('WebAppMaker')
        .controller('flickrSearchController', flickrController);

    function flickrController(currentUser, flickrService, widgetService, $routeParams, $location) {
        var model = this;

        model.currentUser = currentUser;
        var userId = currentUser['_id'];
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];
        var widgetId = $routeParams['widgetId'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {"url" : url, "width": "100%", "widgetType" : "IMAGE", "_id":widgetId};
            widgetService
                .updateWidget(widgetId, widget)
                .then(function(response) {
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                });
        }
    }
})();