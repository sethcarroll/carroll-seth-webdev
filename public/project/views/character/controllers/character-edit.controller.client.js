(function() {
    angular
        .module('DiceRole')
        .controller('characterEditController', characterEditController);

    function characterEditController(currentPlayer, $routeParams, characterService, $location) {

        var model = this;

        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.campaignId = $routeParams['campaignId'];
        model.characterId = $routeParams['characterId'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);

        model.updateCharacter = updateCharacter;
        model.deleteCharacter = deleteCharacter;


        function init() {
            characterService
                .findAllCharactersForCampaign(model.campaignId)
                .then(function (characters) {
                    model.characters = characters;
                    model.oldCharacters = angular.copy(model.characters);
                });
            characterService
                .findCharacterById(model.characterId)
                .then(function (character) {
                    model.character = character;
                    model.oldCharacter = angular.copy(model.character);
                });
        }

        init();

        function updateCharacter(characterId, character) {
            characterService
                .updateCharacter(characterId, character)
                .then(function (){
                    $location.url('/campaign/'+model.campaignId+'/character');
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