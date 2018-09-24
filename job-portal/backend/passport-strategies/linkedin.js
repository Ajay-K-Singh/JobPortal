const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = function(passport) {
  passport.use(new LinkedInStrategy({
    clientID: keys.linkedin.clientID,
    clientSecret: keys.linkedin.clientSecret,
    callbackURL: keys.linkedin.callbackURL,
    scope: ['r_emailaddress', 'r_basicprofile']
  },
  function(accessToken, refreshToken, profile, done) {
      const newUser = {
          id: profile.id,
          firstName: profile._json.firstName,
          lastName: profile._json.lastName,
          email: profile._json.emailAddress,
          location: profile._json.location.name,
          profileUrl: profile._json.siteStandardProfileRequest.url,
          image: profile._json.pictureUrl
      };
      User.findOne({
        id: profile.id
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