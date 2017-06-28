(function() {
    angular
        .module('DiceRole')
        .controller('characterListController', characterListController);

    function characterListController(currentPlayer, $routeParams, characterService) {
        var model = this;

        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];
        model.campaignId = $routeParams['campaignId'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);

        model.deleteCharacter = deleteCharacter;

        function init() {
            characterService
                .findAllCharactersForCampaign(model.campaignId)
                .then(function (characters) {
                    model.characters = characters;
                });
        }
        init();

        function deleteCharacter(characterId) {
            characterService
                .deleteCharacter(characterId)
                .then(function (){
                    $location.url('/campaign/'+model.campaignId+'/character');
                });
        }

    }
})();