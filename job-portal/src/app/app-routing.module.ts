import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerComponent } from "./job-seeker/job-seeker.component";
import { RecruiterComponent } from "./recruiter/recruiter.component";
import { LandingPageComponent } from './landing-page/landing-page.component'
import { PostJobsComponent } from "./recruiter/post-jobs/post-jobs.component";
import { RecruiterLayoutComponent } from "./layout/recruiter-layout/recruiter-layout.component";


const routes: Routes = [
    {
        path: '',
        component:  LandingPageComponent
    },
    {
        path: 'jobs',
        component: JobSeekerComponent 
    },
    {
        path: 'recruiter',
        component: RecruiterLayoutComponent,
        children: [{
            path: '',
            component: RecruiterComponent
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