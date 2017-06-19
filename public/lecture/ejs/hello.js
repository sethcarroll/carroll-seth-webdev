const app = require('../../../express');

app.get('/this/could/be/anything', function(req, res) {
    res.render('hello');
});