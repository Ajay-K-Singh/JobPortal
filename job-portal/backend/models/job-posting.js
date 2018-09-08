const mongoose = require('mongoose');

const jobPostSchema = mongoose.Schema({
    jobTitle: { type: String },
    nameOfCompany: { type: Object },
    experienceRange: { type: String },
    location: { type: String },
    keySkills: { type: Object },
    jobDescription: { type: String },
    salary: {type: String},
    recruiterInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Recruiter'
    }
});

module.exports = mongoose.model('JobPost', jobPostSchema);