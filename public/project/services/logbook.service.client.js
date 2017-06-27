(function () {
    angular
        .module('DiceRole')
        .service('logbookService', logbookService);

    function logbookService ($http) {

        this.createMessage = createMessage;
        this.deleteMessage = deleteMessage;
        this.findAllMessages = findAllMessages;

        function createMessage(message) {
            var url = "/api/project/logmessage";
            return $http
                .post(url, message)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllMessages() {
            var url = "/api/project/messages";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteMessage(messageId) {
            var url = "/api/project/message/" + messageId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();