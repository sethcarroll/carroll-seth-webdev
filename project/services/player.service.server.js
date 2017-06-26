var app = require('../../express');
var playerModel = require('../model/player/player.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig;
setFacebookConfig();

passport.use(new LocalStrategy(localStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializePlayer(serializePlayer);
passport.deserializePlayer(deserializePlayer);





function setFacebookConfig() {
    if(process.env.MLAB_USERNAME_WEBDEV) {
        facebookConfig = {
            clientID     : process.env.FACEBOOK_CLIENT_ID,
            clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['email']
        };
    }

    else {
        facebookConfig = {
            clientID     : "247791639057154",
            clientSecret : "dca1d4fa0d522d63c1f983c41cc27b76",
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['email']
        }
    }
}




app.get    ('/api/player/:userId', findPlayerById);
app.get    ('/api/player', findPlayerByPlayername);
app.get    ('/api/player', findPlayerByCredentials);
app.post   ('/api/player', createPlayer);
app.put    ('/api/player/:userId', updatePlayer);
app.delete ('/api/player/:userId', deletePlayer);

app.post  ('/api/player/login', passport.authenticate('local'), login);
app.post ('/api/player/logout', logout);
app.post   ('/api/player/register', register);
app.post   ('/api/player/unregister', unregister);
app.get ('/api/player/checkLoggedIn', checkLoggedIn);

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#/profile',
        failureRedirect: '/assignment/#/login'
    }));

app.get('/api/admin/players', findAllPlayers);
app.get('/api/admin/player/:userId', findPlayerById);
app.post('/api//admin/player', createPlayer);
app.delete('/api/admin/player/:userId', deletePlayer);
app.put('/api/admin/player/:userId', updatePlayer);

function createPlayer(req, res) {
    var user= req.body;

    playerModel
        .createPlayer(user)
        .then(function(user) {
            res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });
}

function findPlayerByPlayername(req, res) {
    var username = req.query['username'];

    playerModel
        .findPlayerByPlayername(req.query['username'])
        .then(function(user) {
            if (user === null) {
                res.sendStatus(404);
            } else {
                res.json(user);
            }
        }, function(error) {
            res.sendStatus(404);
        });
}

function findPlayerByCredentials (req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    playerModel
        .findPlayerByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(404);
        });
}

function findPlayerById(req, res) {
    var userId = req.params['userId'];

    playerModel
        .findPlayerById(userId)
        .then(function(user) {
            res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });
}

function updatePlayer(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    playerModel
        .updatePlayer(userId, user)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
}

function deletePlayer(req, res) {
    var userId = req.params['userId'];

    playerModel
        .deletePlayer(userId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });

}

function facebookStrategy(token, refreshToken, profile, done) {
    playerModel
        .findPlayerByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookPlayer = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return playerModel.createPlayer(newFacebookPlayer);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function localStrategy(username, password, done) {
    playerModel
        .findPlayerByCredentials(username, password)
        .then(function(user) {
                console.log(user);
                if(user.username === username) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                console.log('in error');
                if (err) { return done(err); }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    playerModel
        .createPlayer(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function unregister(req, res) {
    playerModel
        .deletePlayer(req.user._id)
        .then(function(response) {
            req.logout();
            res.sendStatus(200);
        })
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    }
    else {
        res.send('0');
    }
}


function serializePlayer(user, done) {
    done(null, user);
}

function deserializePlayer(user, done) {
    playerModel
        .findPlayerById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

