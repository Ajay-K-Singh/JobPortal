import { Component, OnInit } from '@angular/core';
import { JobPostingService } from './job-posting.service';
import { PostJob } from './post-job.model';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit {
  jobPosts: PostJob[] = [];
  constructor(public jobPostingService: JobPostingService) { }

  ngOnInit() {
    this.jobPostingService.getJobPosts();
  }

}
