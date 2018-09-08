const express = require('express');
const Recruiter = require("../models/recruiter");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobPost = require('../models/job-posting');
const router = express.Router();
const ensureAuthentication = require('../middlewares/ensure-authentication');

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Recruiter({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User Created',
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
    Recruiter.findOne({ email: req.body.email })
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
        })
});

router.post("/post-job", ensureAuthentication, (req, res) => {
  const newJobPosting = new JobPost({
    jobTitle: req.body.jobTitle,
    nameOfCompany: req.body.nameOfCompany,
    experienceRange: req.body.experienceRange,
    location: req.body.location,
    keySkills: req.body.keySkills,
    jobDescription: req.body.jobDescription,
    salary: req.body.salary,
    recruiterInfo: req.recruiterData
  });
  newJobPosting.save().then(jobPosted => {
    res.status(201).json({
      message: 'Job Added Successfully'
    });
  });
});

router.get("/job-posts", ensureAuthentication, (req, res) => {
  JobPost.find({ recruiterInfo: req.recruiterData.userId }).then(documents => {
    res.status(200).json({
      message: "Jobs fetched successfully!",
      jobPosts: documents
    });
  });
});

router.delete("/job-posts/:id", ensureAuthentication, (req, res) => {
  JobPost.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  });
});
module.exports = router;