import { NgModule } from '@angular/core';
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
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { JobSeekerHeaderComponent } from './layout/job-seeker-header/job-seeker-header.component';
import { JobSearchFormComponent } from './job-seeker/job-search-form/job-search-form.component';
import { JobListingsComponent } from './recruiter/job-listings/job-listings.component';
import { CompanyAutocompleteComponent } from './common/company-auto-suggestions/company-auto-suggestions.component';
import { JobSeekerListingsComponent } from './job-seeker/jobseeker-listings/jobseeker-listings.component';
import { KeySkillsComponent } from './common/key-skills/key-skills.component';
import { ChipListComponent } from './common/key-skills/chip-list/chip-list.component';
import { AuthorizationComponent } from './auth/auth.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginComponent } from '../app/auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SocialButtonsComponent } from './common/social-login-buttons/social-buttons.component';
import { MessageComponent } from './messages/message.component';
import { SeekerProfile } from './job-seeker/profile/seeker.profile';
import { RecruiterProfile } from './recruiter/profile/recruiter-profile.component';
import { ErrorComponent } from './error-route/error.component';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularSvgIconModule
  ],
  declarations: [
    JobSeekerComponent,
    RecruiterComponent,
    PostJobsComponent,
    JobSeekerLayoutComponent,
    RecruiterLayoutComponent,
    RecruiterHeaderComponent,
    AutocompleteComponent,
    JobSeekerHeaderComponent,
    JobSearchFormComponent,
    JobListingsComponent,
    CompanyAutocompleteComponent,
    JobSeekerListingsComponent,
    KeySkillsComponent,
    ChipListComponent,
    AuthorizationComponent,
    LoginComponent,
    RegisterComponent,
    SocialButtonsComponent,
    MessageComponent,
    SeekerProfile,
    RecruiterProfile,
    ErrorComponent
  ],
  exports: [
    JobSeekerComponent,
    RecruiterComponent,
    PostJobsComponent,
    JobSeekerLayoutComponent,
    RecruiterLayoutComponent,
    RecruiterHeaderComponent,
    AutocompleteComponent,
    JobSeekerHeaderComponent,
    JobSearchFormComponent,
    JobListingsComponent,
    CompanyAutocompleteComponent,
    JobSeekerListingsComponent,
    KeySkillsComponent,
    ChipListComponent,
    AuthorizationComponent ,
    LoginComponent,
    RegisterComponent,
    SocialButtonsComponent,
    MessageComponent,
    SeekerProfile,
    RecruiterProfile,
    ErrorComponent
  ]
})
export class ComponentsModule { }
