(function() {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController(userService, $location) {

        var model = this;

        model.checkLogin = login;

        function login(username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function login(found) {
                if (found) {
                    $location.url("/user/" + found._id);

                }
                else {
                    model.message = "Uh-oh. Either your username or password were incorrect!";
                }
            }

            function handleError() {
                model.message = "Uh-oh. Either your username or password were incorrect!";
            }
        }
    }
})();