var app = require('./express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session');
var passport      = require('passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(app.express.static(__dirname + '/public'));

app.use(cookieParser());

if(process.env.MLAB_USERNAME_WEBDEV) {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true}));
}
else {
    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
}

app.use(passport.initialize());
app.use(passport.session());



app.set('view engine', 'ejs');
require ("./test/app.js")(app);
require ("./assignment/app");
require ("./project/app");
require('./public/lecture/ejs/hello');
require('./public/lecture/ejs/crud/');

var port = process.env.PORT || 3000;

app.listen(port);