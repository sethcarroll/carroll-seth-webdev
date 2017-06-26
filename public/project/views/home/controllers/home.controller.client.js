(function () {
    angular.module("DiceRole")
        .controller('homeController', homeController);

    function homeController(currentPlayer) {
        var model = this;
        model.currentPlayer = currentPlayer;
    }
})();