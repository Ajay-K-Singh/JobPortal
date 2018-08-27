const mongoose = require('mongoose');

const jobPostSchema = mongoose.Schema({
    jobTitle: { type: String },
    nameOfCompany: { type: String },
    experienceRange: { type: String },
    location: { type: String },
    keySkills: { type: String },
    jobDescription: { type: String }
});

module.exports = mongoose.model('JobPost', jobPostSchema);