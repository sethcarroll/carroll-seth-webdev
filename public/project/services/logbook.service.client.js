(function () {
    angular
        .module('DiceRole')
        .service('logbookService', logbookService);

    function logbookService ($http) {

        this.createMessage = createMessage;
        this.deleteMessage = deleteMessage;
        this.findAllMessages = findAllMessages;

        function createMessage(message) {
            var url = "/api/logmessage";
            return $http
                .post(url, message)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCharactersForCampaign () {
            var url = "/api/messages";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteMessage(messageId) {
            var url = "/api/message/" + messageId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();