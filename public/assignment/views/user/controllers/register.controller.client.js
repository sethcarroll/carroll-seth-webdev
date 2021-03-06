(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController(userService, $location) {

        var model = this;
        model.register = register;

        function register(username, password, verifyPassword, email, firstName, lastName) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'You must enter a username.';
                return;
            }
            if (password === null || password === '' || typeof password === 'undefined') {
                model.error = 'You must enter a password.';
                return;
            }
            if (verifyPassword === null || verifyPassword === '' || typeof verifyPassword === 'undefined') {
                model.error = 'Please verify your password.';
                return;
            }
            if (email === null || email === '' || typeof email === 'undefined') {
                model.error = 'You must enter a valid email address.';
                return;
            }
            if (firstName === null || firstName === '' || typeof firstName === 'undefined') {
                model.error = 'You must enter your first name.';
                return;
            }
            if (lastName === null || lastName === '' || typeof lastName === 'undefined') {
                model.error = 'You must enter your last name.';
                return;
            }

            if (password !== verifyPassword) {
                model.error = "Uh oh! The entered passwords didn't match!";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(checkUser);

            function checkUser(user) {
                if (user) {
                    model.error = "Sorry! The username you entered is not available!";
                }
                else {
                    var user = {
                        username: username,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                };

                    userService
                        .register(user)
                        .then(goToProfile);

                    function goToProfile(user) {
                        $location.url('/profile');
                    }

                }
            }
        }
    }
})();