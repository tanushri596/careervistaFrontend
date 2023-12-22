import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ChatComponent } from './chat/chat.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CompanyEmployeesComponent } from './company-employees/company-employees.component';
import { CompanyJobsComponent } from './company-jobs/company-jobs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { NgChartsModule } from 'ng2-charts';
import { MainInterceptorInterceptor } from './main-interceptor.interceptor';










@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    ChatComponent,
    CandidateProfileComponent,
    CompanyEmployeesComponent,
    CompanyJobsComponent,
    CompanyProfileComponent
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
     ChartModule,
     NgxPaginationModule,
     NgChartsModule,
   
     JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['/candidateHome'],
        
      },
    }),
    SweetAlert2Module.forRoot()
   
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MainInterceptorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
