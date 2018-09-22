const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: true }), (req, res, next) => {
    const config = req.app.get('config');
    config.user = req.user.user;
    config.token = req.user.token;
    config.isAuthenticated = true;
    config.loggedInTime = new Date();
    config.userID = req.user.user._id;
    res.redirect("http://localhost:4200");
  })

module.exports = router;