import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { JobSeekerComponent } from "./job-seeker/job-seeker.component";
import { RecruiterComponent } from "./recruiter/recruiter.component";
import { LandingPageComponent } from './landing-page/landing-page.component'


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
        path: 'recruiters',
        component: RecruiterComponent 
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}