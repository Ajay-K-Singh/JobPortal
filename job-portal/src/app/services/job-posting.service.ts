import { Injectable } from '@angular/core';
import { PostJob } from '../models/post-job.model';
import { HttpClient } from  '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private jobPosts: PostJob[] = [];
  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) { }
  private jobsPosted = new Subject<PostJob[]>();
  addJobPosting(id: string,
    jobTitle: string,
    nameOfCompany: object,
    experienceRange: string,
    location: string,
    keySkills: object,
    jobDescription: string, salary: string ) {
      const postJob: PostJob = {
        id: null,
        jobTitle: jobTitle,
        nameOfCompany,
        experienceRange: experienceRange,
        location: location,
        keySkills,
        jobDescription: jobDescription,
        salary: salary
      };
      this.http.post<{ id: string, jobTitle: string, nameOfCOmpany: object, experienceRange: string, location: string, keySkills: object, jobDescription: string, salary: string}>('http://localhost:3000/api/recruiter/post-job', postJob)
        .subscribe((response) => {
          console.log(response);
            const id = response.id;
						postJob.id = id;
						this.jobPosts.push(postJob);
						this.jobsPosted.next([...this.jobPosts]);
						this.router.navigate(["/recruiter"]);
        });
  }
  
  getJobPosts() {
    const requestPath = this.authenticationService.getMode();
    this.http.get<{ jobPosts: any }>(`http://localhost:3000/api/${requestPath}/job-posts`)
      .pipe(map((response) => {
        return response.jobPosts.map((res) => {
          return {
            id: res._id,
            jobTitle: res.jobTitle,
            location: res.location,
            keySkills: res.keySkills,
            nameOfCompany: res.nameOfCompany,
            experienceRange: res.experienceRange,
            jobDescription: res.jobDescription,
            salary: res.salary,
            recruiterId: res.recruiterInfo
          }
        })
      }))
      .subscribe((jobPosts) => {
      console.log(jobPosts);
        this.jobPosts = jobPosts;
        this.jobsPosted.next([...this.jobPosts])
      })
  }

  getJobPostsUpdateUpdateListener() {
    return this.jobsPosted.asObservable();
  }

  deleteJobPost(jobPostId: string) {
    this.http.delete("http://localhost:3000/api/recruiter/job-posts/" + jobPostId)
      .subscribe(() => {
        const updatedJobPosts = this.jobPosts.filter(jobPost => jobPost.id !== jobPostId)
        this.jobPosts = updatedJobPosts;
        this.jobsPosted.next([...this.jobPosts])
      });
  }
}
