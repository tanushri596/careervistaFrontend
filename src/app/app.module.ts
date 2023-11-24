import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateJobComponent } from './candidate-job/candidate-job.component';
import { CandidateApplicationComponent } from './candidate-application/candidate-application.component';
import { CandidateExperienceComponent } from './candidate-experience/candidate-experience.component';
import { CandidateEducationComponent } from './candidate-education/candidate-education.component';
import { CandidateProjectComponent } from './candidate-project/candidate-project.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';






@NgModule({
  declarations: [
    
    AppComponent,
    SignUpComponent,
    LogInComponent,
    CandidateHomeComponent,
    CompanyHomeComponent,
    CandidateJobComponent,
    CandidateApplicationComponent,
    CandidateExperienceComponent,
    CandidateEducationComponent,
    CandidateProjectComponent,
    JobApplicationsComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['/candidateHome'],
        
      },
    }),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
