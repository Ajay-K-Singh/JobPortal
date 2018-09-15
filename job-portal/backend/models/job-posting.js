const mongoose = require('mongoose');

const jobPostSchema = mongoose.Schema({
    jobTitle: { type: String },
    nameOfCompany: { type: Object },
    experienceFrom: { type: Number },
    experienceTo: { type: Number },
    location: { type: String },
    keySkills: { type: Object },
    jobDescription: { type: String },
    recruiterInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Recruiter'
    },
    salaryFrom: {type: Number},
    salaryTo: {type: Number}
});

module.exports = mongoose.model('JobPost', jobPostSchema);