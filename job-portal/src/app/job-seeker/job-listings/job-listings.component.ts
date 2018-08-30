import { Component, OnInit } from '@angular/core';
import { JobPostingService } from '../../services/job-posting.service';
import { PostJob } from '../../models/post-job.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobseeker-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.scss']
})
export class JobListingsComponent implements OnInit {
  jobPosts: PostJob[] = [];
  private jobListings: Subscription;
  constructor(public jobPostingService: JobPostingService){}
  
  ngOnInit() {
    this.jobPostingService.getJobPosts();
    this.jobListings = this.jobPostingService.getJobPostsUpdateUpdateListener().subscribe((jobPosts: PostJob[]) => {
      console.log(jobPosts);
      this.jobPosts = jobPosts;
    });
  }

  onDeleteJobPost(jobPostId: string) {
    this.jobPostingService.deleteJobPost(jobPostId);
  }

  ngOnDestroy() {
    if(this.jobListings){
      this.jobListings.unsubscribe();
     }
  }
}
