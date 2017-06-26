(function() {
    angular
        .module('DiceRole')
        .controller('musicController', musicController);

    function musicController($http, $sce){
        var model = this;

        var apiKey = "599c8e2895be99f0f1487aa143b6b2a1";
        var apiRoot = "https://ws.audioscrobbler.com/2.0/";
        model.searchAlbums = searchAlbums;
        model.getThumbnail = getThumbnail;
        model.getAlbumArt = getAlbumArt;

        function searchAlbums(inputText) {
            model.album = undefined;
            $http.get(apiRoot
                + "?method=album.search&album="
                + inputText
                + "&api_key="
                + apiKey
                + "&format=json")
                .then(function(response) {
                    model.albums = response.data.results.albummatches.album;
                });
        }

        function getThumbnail(album) {
            if (typeof album === "undefined") {
                // do nothing
            }
            else {
                return album.image[0]['#text'];
            }
        }

        function getAlbumArt(album) {
            if (typeof album === "undefined") {
                // do nothing
            }
            else {
                return album.image[2]['#text'];
            }
        }
    }
})();