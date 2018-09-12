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
                    res.status(500).json({
                        error: err
                    });
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    console.log(req.body.email);
    JobSeeker.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            const token = jwt.sign({
                email: fetchedUser.email,
                userId: fetchedUser._id
            }, 'keep_it_secret', {
                expiresIn: "1h"
            });
            res.status(200).json({
                message: 'Authenticated Successfully',
                token: token,
                fetchedUser,
                expiresIn: "3600"
            })
        });
});

router.get("/job-posts", (req, res) => {
  JobPost.find().then(documents => {
    res.status(200).json({
      message: "Jobs fetched successfully!",
      jobPosts: documents
    });
  });
});
module.exports = router;