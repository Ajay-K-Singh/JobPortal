const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackURL,
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
        const newUser = {
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: image
        }
        User.findOne({
          googleId: profile.id
        })
        .then(user => {
          if (user) {
            done(null,{ user, token: accessToken});
          } else {
            //Create user
            new User(newUser)
              .save()
              .then(user => done(null, {user, token: accessToken}));
          }
        })
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

}