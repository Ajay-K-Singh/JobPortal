import { Component, OnInit } from '@angular/core';
import { JobPostingService } from '../../services/job-posting.service';
import { PostJob } from '../../models/post-job.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobseeker-listings',
  templateUrl: './jobseeker-listings.component.html',
  styleUrls: ['./jobseeker-listings.component.scss']
})
export class JobSeekerListingsComponent implements OnInit {
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

  ngOnDestroy() {
    if(this.jobListings){
      this.jobListings.unsubscribe();
     }
  }
}
