module.exports = function (app) {

    var todos = [
        {title: 'todo 1', details: 'details 1'},
        {title: 'todo 2', details: 'details 2'},
        {title: 'todo 3', details: 'details 3'}
    ];


    app.get('/api/todo', findAllTodos);
    app.get('/api/todo/:index', findTodoByIndex);
    app.delete('/api/todo/:index', deleteTodo);

    function deleteTodo(req, res) {
        todos.splice(req.params.index, 1);
        res.json(todos);
    }
    function findAllTodos(req, res) {
        res.json(todos);
    }
    function findTodoByIndex(req, res) {
        var index = req.params['index'];
        res.json(todos[index]);
    }
};