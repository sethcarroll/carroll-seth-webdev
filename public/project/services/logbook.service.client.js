(function () {
    angular
        .module('DiceRole')
        .service('logbookService', logbookService);

    function logbookService ($http) {

        var api = {
            createMessage: createMessage,
            deleteMessage: deleteMessage,
            deleteAllMessages: deleteAllMessages,
            findAllMessages: findAllMessages
        };

        return api;

        function createMessage(message) {
            var url = "/api/project/logmessage";
            return $http
                .post(url, message)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllMessages(key) {
            var url = '/api/project/messages/' + key;
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

        function deleteAllMessages(key) {
            var url = "/api/project/messages/" + key;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();