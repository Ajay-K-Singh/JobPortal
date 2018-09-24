const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL,
    proxy: true,
    profileFields: ['id', 'displayName', 'email', 'photos', 'profileUrl', 'name', 'gender']
  },
  function(accessToken, refreshToken, profile, done) {
    const image = profile._json.picture.data.url;
      const newUser = {
          id: profile._json.id,
          firstName: profile._json.first_name,
          lastName: profile._json.last_name,
          image: image
      }
      User.findOne({
        id: profile._json.id
      })
      .then(user => {
        if (user) {
          done(null, { user, token: accessToken});
        } else {
          new User(newUser)
            .save()
            .then(user => done(null, {user, token: accessToken}));
        }
      })
    }
));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}