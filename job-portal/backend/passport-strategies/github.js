const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = function(passport) {
  passport.use(new GithubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: keys.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      const newUser = {
          id: profile._json.id,
          firstName: profile._json.name.split(' ')[0],
          lastName: profile._json.name.split(' ')[1],
          email: profile._json.email,
          location: profile._json.location,
          profileUrl: profile._json.url,
          image: profile._json.avatar_url
      };
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