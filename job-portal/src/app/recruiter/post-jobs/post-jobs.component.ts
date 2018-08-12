import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { PostJob } from '../post-job.model';
import { JobPostingService } from '../job-posting.service';

@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.scss']
})
export class PostJobsComponent implements OnInit {
  postJob: PostJob;
  constructor(public jobPostingService: JobPostingService) { }

  ngOnInit() {
    this.postJob = {
      jobTitle: "",
      nameOfCOmpany: "",
      experienceRange: "",
      location: "",
      keySkills: "",
      jobDescription: ""
    };
  }

  onAddJob(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const jobPost = {
      jobTitle: form.value.jobTitle,
      nameOfCompany: form.value.nameOfCompany,
      experienceRange: form.value.experienceRange,
      location: form.value.location,
      keySkills: form.value.keySkills,
      jobDescription: form.value.jobDescription
    }
    this.jobPostingService.addJobPosting(jobPost.jobTitle, 
      jobPost.nameOfCompany,jobPost.experienceRange, jobPost.location, jobPost.keySkills, jobPost.jobDescription);
  }
}
