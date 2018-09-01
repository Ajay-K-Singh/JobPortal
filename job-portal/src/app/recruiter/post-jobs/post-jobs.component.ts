import { Component, OnInit, Input } from '@angular/core';
import { PostJob } from '../../models/post-job.model';
import { JobPostingService } from '../../services/job-posting.service';
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
  locationLabel = "Location";
  locationPlaceholder = "Location of the Job";
  nameOfCompanyLabel = "Name Of Copmany";
  companyInfo: object;
  skillSet = [];
  constructor(public jobPostingService: JobPostingService) { }

  ngOnInit() {
    this.jobPostForm = new FormGroup({
      'jobTitle': new FormControl(null, Validators.required),
      'experienceRange': new FormControl(null, Validators.required),
      'jobDescription': new FormControl(null, Validators.required),
      'salary': new FormControl(null, Validators.required)
    });
  }

  private addFormControl(name: string, formGroup: FormGroup) : void {
    this.jobPostForm.addControl(name, formGroup);
	}

  private setSelectedCompamy(event): void {
    this.companyInfo = {
      nameOfCompany: event.company.name,
      logo: event.company.logo,
      domain: event.company.domain
    }
  }

  private setSelectedSkillSet(event): void {
    this.skillSet = event.skillSet;
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
      nameOfCompany: this.companyInfo,
      experienceRange: form.value.experienceRange,
      location: form.value.location['location'],
      keySkills: this.skillSet,
      jobDescription: form.value.jobDescription,
      salary: form.value.salary
    }
    this.jobPostingService.addJobPosting(jobPost.id, jobPost.jobTitle, 
      jobPost.nameOfCompany,jobPost.experienceRange, jobPost.location, jobPost.keySkills, jobPost.jobDescription, jobPost.salary);
    form.reset();
  }
}
