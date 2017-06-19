var app = require('../../express');
var userModel = require('../model/user/user.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig;
setGoogleConfig();

passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);





function setGoogleConfig() {
    if(process.env.MLAB_USERNAME_WEBDEV) {
        googleConfig = {
            clientID     : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
            callbackURL  : process.env.GOOGLE_CALLBACK_URL
        };
    }

    else {
        googleConfig = {
            clientID     : "960791911356-meaovnpqmltlreojgj965m8d9qss93s2.apps.googleusercontent.com",
            clientSecret : "VmkIQZvldRhAJcNtQ4iheXMx",
            callbackURL: "http://localhost:3000/auth/google/callback"
        }
    }
}




app.get    ('/api/user/:userId', findUserById);
app.get    ('/api/user', findUserByUsername);
app.get    ('/api/user', findUserByCredentials);
app.post   ('/api/user', createUser);
app.put    ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);

app.post  ('/api/login', passport.authenticate('local'), login);
app.post ('/api/logout', logout);
app.post   ('/api/register', register);
app.post   ('/api/unregister', unregister);
app.get ('/api/checkLoggedIn', checkLoggedIn);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

function createUser(req, res) {
    var user= req.body;

    userModel
        .createUser(user)
        .then(function(user) {
            res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(req.query['username'])
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

function findUserByCredentials (req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(404);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);
        }, function(error) {
            res.sendStatus(404);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    userModel
        .updateUser(userId, user)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];

    userModel
        .deleteUser(userId)
        .then(function(response) {
            res.sendStatus(200);
        }, function(error) {
            res.sendStatus(404);
        });

}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
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
    userModel
        .findUserByCredentials(username, password)
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
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
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


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

