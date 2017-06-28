(function() {
    angular
        .module('DiceRole')
        .controller('characterNewController', characterNewController);

    function characterNewController(currentPlayer, characterService, $routeParams, $location) {
        var model = this;
        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.campaignId = $routeParams['campaignId'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);

        model.createCharacter = createCharacter;

        model.deleteCharacter = deleteCharacter;

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
                    $location.url("/campaign/"+model.campaignId+"/character");
                });
        }

        function deleteCharacter(characterId) {
            characterService
                .deleteCharacter(characterId)
                .then(function (){
                    $location.url('/campaign/'+model.campaignId+'/character');
                });
        }
    }
})();