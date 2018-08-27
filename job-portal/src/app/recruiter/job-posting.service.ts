import { Injectable } from '@angular/core';
import { PostJob } from './post-job.model';
import { HttpClient } from  '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private jobPosts: PostJob[] = [];
  constructor(private http: HttpClient) { }
  private jobsPosted = new Subject<PostJob[]>();
  addJobPosting(id: string,
    jobTitle: string,
    nameOfCompany: string,
    experienceRange: string,
    location: string,
    keySkills: string,
    jobDescription: string ) {
      const postJob: PostJob = {
        id: null,
        jobTitle: jobTitle,
        nameOfCompany: nameOfCompany,
        experienceRange: experienceRange,
        location: location,
        keySkills: keySkills,
        jobDescription: jobDescription
      };
      this.http.post<{ id: string, jobTitle: string, nameOfCOmpany: string, experienceRange: string, location: string, keySkills: string, jobDescription: string}>('http://localhost:3000/api/post-job', postJob)
        .subscribe((response) => {
          console.log(response);
        });
  }
  
  getJobPosts() {
    this.http.get<{ jobPosts: any }>('http://localhost:3000/api/job-posts')
      .pipe(map((response) => {
        return response.jobPosts.map((res) => {
          return {
            id: res._id,
            jobTitle: res.jobTitle,
            location: res.location,
            keySkills: res.keySkills,
            nameOfCompany: res.nameOfCompany,
            experienceRange: res.experienceRange,
            jobDescription: res.jobDescription
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
    this.http.delete("http://localhost:3000/api/job-posts/" + jobPostId)
      .subscribe(() => {
        const updatedJobPosts = this.jobPosts.filter(jobPost => jobPost.id !== jobPostId)
        this.jobPosts = updatedJobPosts;
        this.jobsPosted.next([...this.jobPosts])
      });
  }
}
