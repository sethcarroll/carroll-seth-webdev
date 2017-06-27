var app = require('../express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://localhost/carroll-seth-webdev'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds033046.mlab.com:33046/heroku_jzc58s64'; // use yours
}

mongoose.connect(connectionString);

require('./services/player.service.server');
require('./services/campaign.service.server');
require('./services/character.service.server');
require('./services/logbook.service.server');
