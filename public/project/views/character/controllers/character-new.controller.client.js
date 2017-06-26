(function() {
    angular
        .module('DiceRole')
        .controller('characterNewController', characterNewController);

    function characterNewController(currentPlayer, characterService, $routeParams, $location) {
        var model = this;
        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.campaignId = $routeParams['campaignId'];
        model.createCharacter = createCharacter;

        function init() {
            characterService
                .findAllCharactersForCampaign(model.campaignId)
                .then(function (characters) {
                    model.characters = characters;
                });
        }
        init();

        function createCharacter (character) {
            character.campaignId = model.campaignId;
            characterService
                .createCharacter(character)
                .then(function () {
                    $location.url("/player/"+model.userId+"/campaign/"+model.campaignId+"/character");
                });
        }
    }
})();