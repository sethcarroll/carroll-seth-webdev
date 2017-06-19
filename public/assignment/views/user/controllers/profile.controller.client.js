(function() {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams) {

        var model = this;

        model.user = currentUser;
        model.userId = currentUser['_id'];


        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser (user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "Updated successfully!";
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function() {
                    $location.url('/login');
                });
        }
    }
})();