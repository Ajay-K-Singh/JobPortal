import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { AppRoutingModule } from './app-routing.module';
import { PostJobsComponent } from './recruiter/post-jobs/post-jobs.component';
import { JobSeekerLayoutComponent } from './layout/job-seeker-layout/job-seeker-layout.component';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { RecruiterHeaderComponent } from './layout/recruiter-header/recruiter-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    JobSeekerComponent,
    RecruiterComponent,
    PostJobsComponent,
    JobSeekerLayoutComponent,
    RecruiterLayoutComponent,
    RecruiterHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
