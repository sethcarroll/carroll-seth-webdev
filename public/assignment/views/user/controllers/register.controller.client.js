(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController(userService, $location) {

        var model = this;

        function register(username, password, verifyPassword, email, firstName, lastName) {
            if (password !== verifyPassword) {
                model.message = "Uh oh! The entered passwords didn't match!";
            }
            else {
                var exists = userService.findUserByUsername(username);
                if (exists !== null) {
                    model.message = "Whoops! " + username + "is already taken!";
                }
                else {
                    var user = {
                        username: username,
                        password: password,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    };

                    userService.createUser(user);
                    $location.url('/user/'+user['_id']);
                }
            }
        }
    }
})();