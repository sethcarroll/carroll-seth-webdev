(function() {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController(userService, $location) {

        var model = this;

        model.checkLogin = function(username, password) {
            var user = userService.findUserByCredentials(username, password);
            if (user !== null) {
                $location.url("/user/"+user['_id']);
            }
            else {
                model.message = "Uh-oh. We couldn't find a user by the name of " + username + "!";
            }
        }
    }
})();