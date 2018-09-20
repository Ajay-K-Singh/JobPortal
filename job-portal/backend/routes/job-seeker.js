const express = require('express');
const JobSeeker = require("../models/job-seeker");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JobPost = require('../models/job-posting');

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const jobSeeker = new JobSeeker({
              email: req.body.email,
              password: hash
          });
          jobSeeker.save()
          .then(result => {
              res.status(201).json({
                  message: 'Sign Up Successful. Please Login now!',
                  result: result
              });
          })
          .catch(err => {
            if (err.errors.email.kind === 'unique') {
              res.status(500).json({
                message: 'You are already Signed Up. Please Log In with valid credentials.'
              })
            }
          })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post("/login", (req, res, next) => {
    const config = req.app.get('config');
    JobSeeker.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
            res.status(401).json({
                message: 'User does not exist. Please Sign Up and then Log in.',
                hasSignedUp: false
            });
        }
        config.user = user;
        return bcrypt.compare(req.body.password, user.password)
      })
      .then(result => {
          if (!result) {
              return res.status(401).json({
                  message: 'User email or password not correct.',
                  hasSignedUp: true
              });
          }
          const token = jwt.sign({
              email: config.user.email,
              userId: config.user._id
          }, 'keep_it_secret', {
              expiresIn: "1h"
          });
          config.token = token;
          config.isAuthenticated = true;
          config.loggedInTime = new Date();
          res.status(200).json({
              message: 'Authenticated Successfully',
              config,
              expiresIn: "3600"
          })
      })
      .catch(err => {
        res.status(500).json({
            error: err
        })
      });
});

router.get("/job-posts", (req, res) => {
  JobPost.find().then(documents => {
    res.status(200).json({
      message: "Jobs fetched successfully!",
      jobPosts: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      error: error
    })
  });
});
module.exports = router;