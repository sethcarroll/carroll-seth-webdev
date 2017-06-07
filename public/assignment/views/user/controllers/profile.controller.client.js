(function() {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        userService
            .findUserById(model.userId)
            .then(renderUser);

        function renderUser (user) {
            model.user = user;
        }

        function updateUser (userId, user) {
            userService
                .updateUser(userId, user)
                .then(function () {
                    model.message = "Updated successfully!";
                });
        }

        function deleteUser (userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();