const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/config');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/github', passport.authenticate('github'));


router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: true }), (req, res, next) => {
    setConfiguration(req);
    res.redirect("http://localhost:4200");
  });

  router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),(req, res, next) => {
    setConfiguration(req);
    res.redirect("http://localhost:4200");
});

router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
    setConfiguration(req);
    res.redirect("http://localhost:4200");
  });

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    setConfiguration(req);
    res.redirect("http://localhost:4200");
  });

function setConfiguration(req) {
  config.user = req.user.user;
  config.token = req.user.token;
  config.isAuthenticated = true;
  config.loggedInTime = new Date();
  config.userID = req.user.user._id;
};

module.exports = router;