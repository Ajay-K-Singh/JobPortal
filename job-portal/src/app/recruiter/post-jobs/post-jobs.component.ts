import { Component, OnInit } from '@angular/core';
import { PostJob } from '../post-job.model';
import { JobPostingService } from '../job-posting.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.scss']
})
export class PostJobsComponent implements OnInit {
  postJob: PostJob;
  jobPostForm: FormGroup;
  label = "Location";
  placeholder = "Location of the Job"
  constructor(public jobPostingService: JobPostingService) { }

  ngOnInit() {
    this.jobPostForm = new FormGroup({
      'jobTitle': new FormControl(null, Validators.required),
      'nameOfCompany': new FormControl(null, Validators.required),
      'experienceRange': new FormControl(null, Validators.required),
      'keySkills': new FormControl(null, Validators.required),
      'jobDescription': new FormControl(null, Validators.required)
    });
  }

  private addFormControl(name: string, formGroup: FormGroup) : void {
    this.jobPostForm.addControl(name, formGroup);
	}

  onSubmit() {
    const form = this.jobPostForm;
    console.log(form);
    if (form.invalid) {
      return;
    }
    const jobPost = {
      id: null,
      jobTitle: form.value.jobTitle,
      nameOfCompany: form.value.nameOfCompany,
      experienceRange: form.value.experienceRange,
      location: form.value.location['location'],
      keySkills: form.value.keySkills,
      jobDescription: form.value.jobDescription
    }
    console.log(jobPost.nameOfCompany);
    this.jobPostingService.addJobPosting(jobPost.id, jobPost.jobTitle, 
      jobPost.nameOfCompany,jobPost.experienceRange, jobPost.location, jobPost.keySkills, jobPost.jobDescription);
  }
}
