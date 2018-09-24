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
    experienceFrom: number,
    experienceTo: number,
    location: string,
    keySkills: object,
    jobDescription: string,
    salaryFrom: number,
    salaryTo: number ) {
      const postJob: PostJob = {
        id: null,
        jobTitle: jobTitle,
        nameOfCompany,
        experienceFrom: experienceFrom,
        experienceTo: experienceTo,
        location: location,
        keySkills,
        jobDescription: jobDescription,
        salaryFrom: salaryFrom,
        salaryTo: salaryTo
      };
      const requestPath = localStorage.getItem('loggedInAs');
      this.http.post<{ id: string, jobTitle: string, nameOfCOmpany: object, experienceFrom: number,
        experienceTo: number, location: string, keySkills: object, jobDescription: string,
        salaryFrom: number, salaryTo: number}>(`https://localhost:3000/api/${requestPath}/post-job`, postJob)
        .subscribe((response) => {
            const id = (<any>response).jobPost._id;
						postJob.id = id;
						this.jobPosts.push(postJob);
						this.jobsPosted.next([...this.jobPosts]);
						this.router.navigate(["/recruiter"]);
        });
  }
  
  getJobPosts() {
    const requestPath = localStorage.getItem('loggedInAs');
    this.http.get<{ jobPosts: any }>(`https://localhost:3000/api/${requestPath}/job-posts`)
      .pipe(map((response) => {
        return response.jobPosts.map((res) => {
          return {
            id: res._id,
            jobTitle: res.jobTitle,
            location: res.location,
            keySkills: res.keySkills,
            nameOfCompany: res.nameOfCompany,
            experienceFrom: res.experienceFrom,
            experienceTo: res.experienceTo,
            jobDescription: res.jobDescription,
            salaryFrom: res.salaryFrom,
            salaryTo: res.salaryTo
          }
        })
      }))
      .subscribe((jobPosts) => {
        this.jobPosts = jobPosts;
        this.jobsPosted.next([...this.jobPosts])
      })
  }

  getJobPostsUpdateUpdateListener() {
    return this.jobsPosted.asObservable();
  }

  deleteJobPost(jobPostId: string) {
    this.http.delete("https://localhost:3000/api/recruiter/job-posts/" + jobPostId)
      .subscribe(() => {
        const updatedJobPosts = this.jobPosts.filter(jobPost => jobPost.id !== jobPostId)
        this.jobPosts = updatedJobPosts;
        this.jobsPosted.next([...this.jobPosts])
      });
  }
}
