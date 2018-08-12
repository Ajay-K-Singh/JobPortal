import { Injectable } from '@angular/core';
import { PostJob } from './post-job.model';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private jobPosts: PostJob[] = [];
  constructor(private http: HttpClient) { }

  addJobPosting(jobTitle: string,
    nameOfCOmpany: string,
    experienceRange: string,
    location: string,
    keySkills: string,
    jobDescription: string ) {
      const postJob: PostJob = {
        jobTitle: jobTitle,
        nameOfCOmpany: nameOfCOmpany,
        experienceRange: experienceRange,
        location: location,
        keySkills: keySkills,
        jobDescription: jobDescription
      }
      this.http.post<{ jobTitle: string, nameOfCOmpany: string, experienceRange: string, location: string, keySkills: string, jobDescription: string}>('http://localhost:3000/api/post-job', postJob)
        .subscribe((response) => {
          console.log(response);
        });
  }
  
  getJobPosts() {
    this.http.get<{message: string, jobPosts: any }>('http://localhost:3000/api/job-posts')
      .subscribe((response) => {
        console.log(response);
      })
  }
}
