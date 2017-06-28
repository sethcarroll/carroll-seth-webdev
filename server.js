var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


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


require('./project/app');

app.listen(process.env.PORT || 3000);