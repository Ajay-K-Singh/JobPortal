import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { PostJobsComponent } from './recruiter/post-jobs/post-jobs.component';
import { JobSeekerLayoutComponent } from './layout/job-seeker-layout/job-seeker-layout.component';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { RecruiterHeaderComponent } from './layout/recruiter-header/recruiter-header.component';
import { AutocompleteComponent } from './common/autocomplete/autocomplete.component';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    LandingPageComponent,
    JobSeekerComponent,
    RecruiterComponent,
    PostJobsComponent,
    JobSeekerLayoutComponent,
    RecruiterLayoutComponent,
    RecruiterHeaderComponent,
    AutocompleteComponent
  ],
  exports: [
    LandingPageComponent,
    JobSeekerComponent,
    RecruiterComponent,
    PostJobsComponent,
    JobSeekerLayoutComponent,
    RecruiterLayoutComponent,
    RecruiterHeaderComponent,
    AutocompleteComponent
  ]
})
export class ComponentsModule { }