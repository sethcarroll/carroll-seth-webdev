(function() {
    angular
        .module('DiceRole')
        .controller('experimentController', experimentController);

    function experimentController($http, $scope, $q, $sanitize, $window){
        var model = this;
        var deferred = $q.defer();

        var apiKey = "599c8e2895be99f0f1487aa143b6b2a1";
        var apiRoot = "https://ws.audioscrobbler.com/2.0/";
        var diceRoot = "https://rolz.org/api/?";
        var diceRootLong = "http://cors.io/?https://rolz.org/api/?";
        model.searchAlbums = searchAlbums;
        model.getThumbnail = getThumbnail;
        model.getAlbumArt = getAlbumArt;
        model.diceRoll = diceRoll;

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
                return album.image[3]['#text'];
            }
        }

        //note: if you dislike the use of $scope, $sanitize, $q, etc, blame Angular. It refused to work with $sce
        // and my original, cleaner .then
        function diceRoll(dice) {
            model.diceModifier = dice.modifier;

            var url = diceRoot + dice.number + "d" + dice.type + ".jsonp";
            var trustedURL = $sanitize(url);
            $http.jsonp(trustedURL);
            $window.cbfunction = function(response){
                $scope.$apply(function(){
                    deferred.resolve(response)
                })
            };
            deferred.promise.then(function(data){
                model.dice = data;
                model.diceResult = Number(model.dice.result) + dice.modifier;
            });

        }
    }
})();