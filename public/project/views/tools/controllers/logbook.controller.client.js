(function() {
    angular
        .module('DiceRole')
        .controller('logbookController', logbookController);

    function logbookController(currentPlayer, $location, $routeParams, logbookService, $route) {
        var model = this;

        model.currentPlayer = currentPlayer;
        model.currentPlayerIdString = '["' + currentPlayer._id + '"]';
        model.userId = currentPlayer['_id'];
        model.currentPlayerRoles = currentPlayer['roles'];
        model.isAdmin = (model.currentPlayerRoles.indexOf('ADMIN') !== -1);

        model.createMessage = createMessage;
        model.deleteMessage = deleteMessage;

        function init() {
            var key = 'key';
            logbookService
                .findAllMessages(key)
                .then(function (messages) {
                    model.messages = messages;
                    console.log(model.messages);
                    console.log(model.userId);
                });
        }
        init();

        function createMessage(message) {
            var fullname = currentPlayer.firstName + " " + currentPlayer.lastName;
            var logmessage = {
                text: message.text,
                _user: currentPlayer,
                key: 'key',
                name: fullname
            };
            logbookService
                .createMessage(logmessage)
                .then(function () {
                    $route.reload();
                });
        }


        function deleteMessage(messageId) {
            logbookService
                .deleteMessage(messageId)
                .then(function (){
                    $route.reload();
                });
        }
    }


})();