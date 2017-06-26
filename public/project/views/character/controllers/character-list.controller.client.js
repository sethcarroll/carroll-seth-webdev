(function() {
    angular
        .module('DiceRole')
        .controller('characterListController', characterListController);

    function characterListController(currentPlayer, $routeParams, characterService) {
        var model = this;

        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.campaignId = $routeParams['campaignId'];

        function init() {
            characterService
                .findAllCharactersForCampaign(model.campaignId)
                .then(function (characters) {
                    model.characters = characters;
                });
        }
        init();

    }
})();