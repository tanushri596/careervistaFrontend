import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { logInRouteGuard } from './routeGuards/log-in-route.guard';
import { CandidateJobComponent } from './candidate-job/candidate-job.component';
import { CandidateApplicationComponent } from './candidate-application/candidate-application.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { CandidateProjectComponent } from './candidate-project/candidate-project.component';
import { CandidateExperienceComponent } from './candidate-experience/candidate-experience.component';
import { CandidateEducationComponent } from './candidate-education/candidate-education.component';
// import { logInRouteGuard } from './routeGuards/log-in-route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'candidateHome', pathMatch: 'full'},
  { path: '', redirectTo: 'companyHome', pathMatch: 'full'},
  { path: '', redirectTo: 'logIn', pathMatch: 'full'},
  { path: 'logIn', component: LogInComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'candidateHome', component: CandidateHomeComponent,canActivate:[logInRouteGuard]},
  { path: 'companyHome', component: CompanyHomeComponent,canActivate:[logInRouteGuard] },
  { path: 'candidateJobs', component: CandidateJobComponent,canActivate:[logInRouteGuard] }, 
  {path:'candidateApplications',component:CandidateApplicationComponent,canActivate:[logInRouteGuard]},
  {path:'jobApplications',component:JobApplicationsComponent,canActivate:[logInRouteGuard]},
  {path:'candidateProjects',component:CandidateProjectComponent,canActivate:[logInRouteGuard]},
  {path:'candidateExperience',component:CandidateExperienceComponent,canActivate:[logInRouteGuard]},
  {path:'candidateEducation',component:CandidateEducationComponent,canActivate:[logInRouteGuard]},
  
  { path: '**', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [logInRouteGuard], 
  exports: [RouterModule],
})
export class AppRoutingModule {}
