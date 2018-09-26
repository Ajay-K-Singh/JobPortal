const express = require('express');
const Recruiter = require("../models/recruiter");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobPost = require('../models/job-posting');
const jwtKey = require('../config/keys').jwtKey;
const router = express.Router();
const ensureAuthentication = require('../middlewares/ensure-authentication');

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new Recruiter({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash
      });
      user.save()
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
    Recruiter.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
            res.status(401).json({
                message: 'User does not exist. Please Sign Up and then Log in.',
                hasSignedUp: false
            });
        }
        let userInfo = {};
        Object.keys(user._doc).forEach(key => {
          if (key !== 'password') {
            userInfo[key] = user[key];
          }
        });
        config.user = userInfo;
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
        }, jwtKey.jwt, {
          expiresIn: "1h"
        });
        config.token = token;
        config.isAuthenticated = true;
        config.loggedInTime = new Date();
        res.status(200).json({
          message: 'Authenticated Successfully',
          token: token,
          config,
          expiresIn: 3600        
        })
      })
      .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.post("/post-job", ensureAuthentication, (req, res) => {
  const config = req.app.get('config');
  const newJobPosting = new JobPost({
    jobTitle: req.body.jobTitle,
    nameOfCompany: req.body.nameOfCompany,
    experienceFrom: req.body.experienceFrom,
    experienceTo: req.body.experienceTo,
    location: req.body.location,
    keySkills: req.body.keySkills,
    jobDescription: req.body.jobDescription,
    salaryFrom: req.body.salaryFrom,
    salaryTo: req.body.salaryTo,
    recruiterInfo: config.userID
  });
  newJobPosting.save().then(jobPosted => {
    res.status(201).json({
      message: 'Job Added Successfully',
      jobPost: jobPosted
    });
  })
  .catch(err => {
    res.status(500).json({
        error: err
    })
  });
});

router.get("/job-posts", (req, res) => {
  const config = req.app.get('config');
  JobPost.find({ recruiterInfo: config.userID }).then(documents => {
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

router.delete("/job-posts/:id", ensureAuthentication, (req, res) => {
  JobPost.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  });
});
module.exports = router;