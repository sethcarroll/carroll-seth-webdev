(function() {
    angular
        .module('DiceRole')
        .controller('diceController', diceController);

    function diceController($http, $sce){
        var model = this;

        var diceRoot = "https://rolz.org/api/?";
        model.diceRoll = diceRoll;

        function diceRoll(dice) {
            model.diceModifier = dice.modifier;

            var url = diceRoot + dice.number + "d" + dice.type + ".jsonp";
            var trustedURL = $sce.trustAsResourceUrl(url);
            $http.jsonp(trustedURL, {jsonpCallbackParam: 'callback'})
                .then(function(response) {
                    console.log(response);
                    model.dice = response.data;
                    model.diceResult = Number(model.dice.result) + dice.modifier;
                });
        }
    }
})();