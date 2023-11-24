import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { Application, Candidate, Company, Education, Experience, Job, Project, logIn } from '../model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})


export class SignUpService {
  constructor(private http: HttpClient, private jwtHelper : JwtHelperService,private router:Router) {}

  private dataSubject = new BehaviorSubject<any>(true);
  data$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  private baseURL = `http://localhost:8080`;

  addCandidate(data: any) {
    return this.http.post(this.baseURL + '/candidate/signUp', data);
  }

  addCompany(data: any) {
    return this.http.post(this.baseURL + '/company/signUp', data);
  }

  addJobBycandidate(data:Job)
  {
    
    return this.http.post(this.baseURL + '/candidate/addJob', data);
  }

  addEducation(data:Education)
  {
    return this.http.post(this.baseURL+'/candidate/addEducation',data);
  }

  getEducations(userId:number):()=>Observable<Education[]>
  {
    return ()=>this.http.get<Education[]>(`${this.baseURL}/candidate/getEducation/${userId}`);
 
  }

  deleteEducation(eduId:number)
  {
    return this.http.delete(`${this.baseURL}/candidate/deleteEducation/${eduId}`);
 
  }

  addProject(data : Project)
  {
    return this.http.post(this.baseURL+'/candidate/addProject',data);
  }

  getProjects(userId:number):()=>Observable<Project[]>
  {
    return ()=>this.http.get<Project[]>(`${this.baseURL}/candidate/getProject/${userId}`);
 
  }

  deleteProject(proId:number)
  {
    return this.http.delete(`${this.baseURL}/candidate/deleteProject/${proId}`);
 
  }

  

  addExperience(data : Experience)
  {
    return this.http.post(this.baseURL+'/candidate/addExperience',data);
  }

  getExperiences(userId:number):()=>Observable<Experience[]>
  {
    return ()=>this.http.get<Experience[]>(`${this.baseURL}/candidate/getExperience/${userId}`);
 
  }

  deleteExperience(expId:number)
  {
    return this.http.delete(`${this.baseURL}/candidate/deleteExperience/${expId}`);
 
  }

  authenticateUser(data: logIn) {
    const loginUser = {
      username: data.username,
      password: data.password,
      role: data.role,
    };
    if (loginUser.role === 'candidate')
      return this.http.post(this.baseURL + '/candidate/logIn', loginUser);
    else return this.http.post(this.baseURL + '/company/logIn', loginUser);
  }

  authenticateToken() {
    var token = localStorage.getItem('token');
    if (token === null || token === undefined) {
      return false;
    }
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return !isTokenExpired;
  }

  getCurrentCandidate(username: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.baseURL}/candidate/getCandidateByUsername/${username}`);
  }

  getCandidate(username: string): Observable<boolean> {
    
    return this.http.get<boolean>(`${this.baseURL}/candidate/getCandidateViaUsername/${username}`);
  }

  
  getCompany(username: string): Observable<boolean> {
    
    return this.http.get<boolean>(`${this.baseURL}/company/getCompanyViaUsername/${username}`);
  }


  
getAllCompanies():()=>Observable<Company[]>
  {
    return ()=>this.http.get<Company[]>(this.baseURL +'/company/getAllCompanies');
  }

  getAllJobs():()=>Observable<Job[]>
  {
    return ()=>this.http.get<Job[]>(this.baseURL+'/candidate/getAllJobs');
  }

  deleteJob(jobId:number)
  {
    
   return this.http.delete(`${this.baseURL}/candidate/deleteJob/${jobId}`);
  }

  postApplication(application:Application)
  {
    console.log(application);
    return this.http.post(this.baseURL+'/candidate/addApplications',application);
  }

  getAllApplications(userId:number):()=>Observable<Application[]>
  {
    return ()=>this.http.get<Application[]>(`${this.baseURL}/candidate/getApplicationsByUserId/${userId}`);
 
  }

  getAllApplicationsViaJob(jobId:number):()=>Observable<Application[]>
  {
    return ()=>this.http.get<Application[]>(`${this.baseURL}/candidate/getApplicationsByJobId/${jobId}`);
 
  }

  updateStatus(status:string,appId:number) : Observable<any>
  {
     return this.http.patch<any>(`${this.baseURL}/candidate/updateApplicationStatus/${appId}`,status);
  }

  deleteApplication(appId:number)
  {
    
   return this.http.delete(`${this.baseURL}/candidate/deleteApplication/${appId}`);
  }

  logOut() {
    try {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        console.log('Token removed successfully');
      } else {
        console.log('No token found');
      }
      
      if (localStorage.getItem('role')) {
        localStorage.removeItem('role');
        console.log('Role removed successfully');
      } else {
        console.log('No role found');
      }

      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        console.log('Token removed successfully');
      } else {
        console.log('No token found');
      }
      
      if (localStorage.getItem('username')) {
        localStorage.removeItem('username');
        console.log('username removed successfully');
      } else {
        console.log('No role found');
      }

      
      
      this.router.navigate(['/logIn']);
    } catch (error) {
      console.error('Error removing items:', error);
    }
  }
}
