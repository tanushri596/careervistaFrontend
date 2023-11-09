import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CandidateHomeComponent } from './candidate-home/candidate-home.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { logInRouteGuard } from './routeGuards/log-in-route.guard';
// import { logInRouteGuard } from './routeGuards/log-in-route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'candidateHome', pathMatch: 'full'},
  { path: '', redirectTo: 'companyHome', pathMatch: 'full'},
  { path: '', redirectTo: 'logIn', pathMatch: 'full'},
  { path: 'logIn', component: LogInComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'candidateHome', component: CandidateHomeComponent,canActivate:[logInRouteGuard]},
  { path: 'companyHome', component: CompanyHomeComponent,canActivate:[logInRouteGuard] },

  { path: '**', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [logInRouteGuard], 
  exports: [RouterModule],
})
export class AppRoutingModule {}
