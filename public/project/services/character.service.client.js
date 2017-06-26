(function () {
    angular
        .module('DiceRole')
        .service('characterService', characterService);

    function characterService ($http) {

        this.createCharacter = createCharacter;
        this.findAllCharactersForCampaign = findAllCharactersForCampaign;
        this.findCharacterById = findCharacterById;
        this.updateCharacter = updateCharacter;
        this.deleteCharacter = deleteCharacter;

        function createCharacter(character) {
            var url = "/api/campaign/" + character.campaignId + "/character";
            return $http
                .post(url, character)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCharactersForCampaign (campaignId) {
            var url = "/api/campaign/" + campaignId + "/character";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCharacterById(characterId) {
            var url = "/api/character/" + characterId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateCharacter(characterId, character) {
            var url = "/api/character/" + characterId;
            return $http
                .put(url, character)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteCharacter(characterId) {
            var url = "/api/character/" + characterId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();