const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const JobPost = require('./models/job-posting');


const app = express();

mongoose
    .connect(
        'mongodb+srv://ajay:ajay1493@job-portal-ziech.mongodb.net/job-portal?retryWrites=true', { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/post-job", (req, res) => {
    const newJobPosting = new JobPost({
        jobTitle: req.body.jobTitle,
        nameOfCOmpany: req.body.nameOfCOmpany,
        experienceRange: req.body.experienceRange,
        location: req.body.location,
        keySkills: req.body.keySkills,
        jobDescription: req.body.jobDescription
    });
    newJobPosting.save().then(jobPosted => {
        res.status(201).json({
            message: 'Job Added Successfully'
        });
    });
});

app.get("/api/job-posts", (req, res) => {
    JobPost.find().then(documents => {
        res.status(200).json({
            message: "Jobs fetched successfully!",
            jobPosts: documents
        });
    });
})

module.exports = app;