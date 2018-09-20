const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const axios = require('axios');
const jobSeekerRoute = require("./routes/job-seeker");
const recruiterRoute = require("./routes/recruiter");
const passport = require('passport');
const socialAuth = require('./routes/social-auth');
const config = require('./config/config');
const session = require("express-session");
const app = express();

app.use(passport.initialize());

require('./passport-strategies/google')(passport);
app.set('config', config);
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
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: "Hell _This _is _the _session"}));

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

app.get("/validate-session", (req, res) => {
  const config = req.app.get('config');
  const now = new Date().getTime();
  if (config.isAuthenticated) {
    config.expiresIn = ((config.loggedInTime.getTime() + (1 * 60 * 60 * 1000))  -  now)/1000;
  }
  if (config.isAuthenticated && config.expiresIn > 0) {
    res.status(200).json({
      user: config
    });
  } else {
    config.isAuthenticated = false;
    config.user = null;
    config.expiresIn = null;
    config.token = null;
    config.loggedInTime = null;
    config.userID = null;
    res.status(200).json({
      message: 'Logged Out',
      user: config
    });
  }
});

app.get('/logout', (req, res) => {
  const config = req.app.get('config');
  config.isAuthenticated = false;
  config.user = null;
  config.expiresIn = null;
  config.token = null;
  config.loggedInTime = null;
  config.userID = null;
  res.status(200).json({
    message: 'Logged Out Successfully',
    user: config
  });
});

app.use("/auth", socialAuth);
app.use("/api/job-seeker", jobSeekerRoute);
app.use("/api/recruiter", recruiterRoute);


module.exports = app;