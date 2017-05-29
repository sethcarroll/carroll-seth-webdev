(function(){
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController)

    function TodoListController($scope, $http) {


        $scope.addTodo = addTodo;
        $scope.removeTodo = removeTodo;
        $scope.selectTodo = selectTodo;
        $scope.updateTodo = updateTodo;

        function init() {
            findAllTodos();
        }
        init();

        function findAllTodos() {
            $http.get('/api/todo')
                .then(function (response) {
                    console.log(response);
                    $scope.todos = response.data;
                });
        }


        // needs to be updated for server maintenance
        function addTodo(todo) {

            if (todo.title != "") {
                var newTodo = angular.copy(todo);
                newTodo._id = (new Date()).getTime();
                newTodo.date = new Date();

                $scope.todos.push(newTodo);
                $scope.todo.title = "";
                $scope.todo.details = "";
            }
        }

        function removeTodo(todo) {
            var index = $scope.todos.indexOf(todo);
            $http.delete('/api/todo/'+index)
                findAllTodos();
        }

        // needs to be updated for server maintenance
        function selectTodo(todo) {
            var index = $scope.todos.indexOf(todo);
            $scope.selectedIndex = index;
            $scope.todo = angular.copy(todo);
        }

        // needs to be updated for server maintenance
        function updateTodo(todo) {
            $scope.todos[$scope.selectedIndex] = angular.copy(todo);
        }
    }


})();