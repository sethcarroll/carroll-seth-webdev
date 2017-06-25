(function() {
    angular
        .module('diceRole')
        .controller('experimentController', experimentController);

    function experimentController($http){
        var model = this;

        var apiKey = "599c8e2895be99f0f1487aa143b6b2a1";
        var apiRoot = "https://ws.audioscrobbler.com/2.0/";
        var diceRoot = "http://cors.io/?https://rolz.org/api/?";
        model.searchAlbums = searchAlbums;
        model.getThumbnail = getThumbnail;
        model.getAlbumArt = getAlbumArt;
        model.diceRoll = diceRoll;

        function searchAlbums(inputText) {
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
                return album.image[3]['#text'];
            }
        }

        function diceRoll(dice) {
            model.diceModifier = dice.modifier;
            $http.get(diceRoot
                + dice.number
                + "d"
                + dice.type
                + ".json")
                .then(function(response) {
                    model.dice = response.data;
                    model.diceResult = Number(model.dice.result) + dice.modifier;
                });
        }
    }
})();