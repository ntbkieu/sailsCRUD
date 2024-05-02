/*eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable prefer-arrow-callback */
/* eslint-disable handle-callback-err */
/* eslint-disable linebreak-style */
/* eslint-disable one-var */

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({ id }, function(err, user) {
    if (err) {return cb(err);}
    cb(null, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, cb) {
  User.findOne({ username: username }, function(err, user) {
    if (err) {return cb(err);}
    if (!user) {return cb(null, false, { message: 'Username not found' });}

    bcrypt.compare(password, user.password, function(err, res) {
      if (!res) {return cb(null, false, { message: 'Invalid Password' });}

      let userDetails = {
        email: user.email,
        username: user.username,
        id: user.id
      };

      return cb(null, userDetails, { message: 'Login Successful' });
    });
  });
}));
