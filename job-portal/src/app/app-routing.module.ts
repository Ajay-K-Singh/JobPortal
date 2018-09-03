import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerComponent } from "./job-seeker/job-seeker.component";
import { RecruiterComponent } from "./recruiter/recruiter.component";
import { LandingPageComponent } from './landing-page/landing-page.component'
import { PostJobsComponent } from "./recruiter/post-jobs/post-jobs.component";
import { RecruiterLayoutComponent } from "./layout/recruiter-layout/recruiter-layout.component";
import { JobSeekerLayoutComponent } from './layout/job-seeker-layout/job-seeker-layout.component';
import { JobSearchFormComponent } from './job-seeker/job-search-form/job-search-form.component';
import { JobListingsComponent } from './recruiter/job-listings/job-listings.component';
import { JobSeekerListingsComponent } from './job-seeker/jobseeker-listings/jobseeker-listings.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
const routes: Routes = [
    {
        path: '',
        component:  LandingPageComponent
    },
    {
      path: 'login-register',
      component:  LoginRegisterComponent
    },
    {
        path: 'jobs',
        component: JobSeekerLayoutComponent,
        children: [{
            path: '',
            component: JobSeekerListingsComponent
        },
        {
            path: 'search-job',
            component: JobSearchFormComponent
          }
        ]
    },
    {
        path: 'recruiter',
        component: RecruiterLayoutComponent,
        children: [{
            path: '',
            component: JobListingsComponent
        },
        {
          path: 'post-job',
          component: PostJobsComponent
        }
      ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}