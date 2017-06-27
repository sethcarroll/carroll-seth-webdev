(function() {
    angular
        .module('DiceRole')
        .controller('diceController', diceController);

    function diceController($http, $scope, $q, $sanitize, $window){
        var deferred = $q.defer();
        var model = this;

        var diceRoot = "https://rolz.org/api/?";
        model.diceRoll = diceRoll;

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