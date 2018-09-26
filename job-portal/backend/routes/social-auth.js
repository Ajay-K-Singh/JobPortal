const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey;


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
  const config = req.app.get('config');
  const token = jwt.sign({
    email: req.user.user.email,
    userId: req.user.user._id,
    token: req.user.token
  }, jwtKey.jwt, {
    expiresIn: "1h"
  });
  config.user = req.user.user;
  config.token = token;
  config.isAuthenticated = true;
  config.loggedInTime = new Date();
  config.userID = req.user.user._id;
};

module.exports = router;