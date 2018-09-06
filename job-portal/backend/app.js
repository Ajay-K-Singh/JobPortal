const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const JobPost = require('./models/job-posting');
const axios = require('axios');
const authRoute = require("./routes/authentication");
const ensureAuthentication = require('./middlewares/ensure-authentication');

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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/post-job", ensureAuthentication, (req, res) => {
  console.log(req.body.keySkills);
  const newJobPosting = new JobPost({
    jobTitle: req.body.jobTitle,
    nameOfCompany: req.body.nameOfCompany,
    experienceRange: req.body.experienceRange,
    location: req.body.location,
    keySkills: req.body.keySkills,
    jobDescription: req.body.jobDescription,
    salary: req.body.salary
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
});

app.delete("/api/job-posts/:id", ensureAuthentication, (req, res) => {
  JobPost.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

app.get("/api/google-places", (req, res) => {
  const key = 'AIzaSyA-HA9qMeaypI5YkDBfOJQi_wWFArXjxOg';
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.location}&types=(cities)&language=pt_BR&key=${key}`
  axios.get(url).then(response => res.send(response.data)).catch(err => console.log(err));
});

app.get("/api/suggest-companies", (req, res) => {
	const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${req.query.nameOfCompany}`;
	axios.get(url).then(response => res.send(response.data)).catch(err => console.log(err));
});

app.get("/api/suggest-skills", (req, res) => {
  const url = `http://api.dataatwork.org/v1/skills/autocomplete?begins_with=${req.query.skill}`;
  axios.get(url).then(response => res.send(response.data)).catch(err => console.log(err));
});

app.use("/api/user", authRoute);


module.exports = app;