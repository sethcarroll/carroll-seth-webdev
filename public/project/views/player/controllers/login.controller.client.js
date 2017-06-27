(function() {
    angular
        .module('DiceRole')
        .controller('loginController', loginController);

    function loginController(playerService, $location) {

        var model = this;

        model.checkLogin = login;

        function login(username, password) {

            playerService
                .login(username, password)
                .then(login, handleError);

            function login(found) {
                if (found) {
                    $location.url("/profile");
                }
                else {
                    model.error = "Uh-oh. Either your username or password were incorrect!";
                }
            }

            function handleError() {
                model.error = "Uh-oh. Either your username or password were incorrect!";
            }
        }
    }
})();