(function() {
    angular
        .module('DiceRole')
        .controller('logbookController', logbookController);

    function logbookController(currentPlayer, $routeParams, logbookService) {
        var model = this;

        model.currentPlayer = currentPlayer;
        model.userId = currentPlayer['_id'];

        model.createMessage = createMessage;
        model.deleteMessage = deleteMessage;

        function init() {
            logbookService
                .findAllMessages()
                .then(function (messages) {
                    model.messages = messages;
                });
        }
        init();

        function createMessage(message) {
            var logmessage = {
                text: message,
                _user: currentPlayer
            };
            logbookService
                .createMessage(logmessage)
                .then(function () {
                    $location.url("#/logbook");
                });
        }
        function deleteMessage(messageId) {
            logbookService
                .deleteMessage(messageId)
                .then(function (){
                    $location.url("#/logbook");
                });
        }
    }


})();