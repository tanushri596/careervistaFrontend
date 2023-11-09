import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { Candidate, Company, Education, Experience, Job, Project, logIn } from '../model';
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

  addProject(data : Project)
  {
    return this.http.post(this.baseURL+'/candidate/addProject',data);
  }

  addExperience(data : Experience)
  {
    return this.http.post(this.baseURL+'/candidate/addExperience',data);
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


  getAllCandidates() : ()=>Observable<Candidate[]>
  {
    return ()=>this.http.get<Candidate[]>(this.baseURL+'/candidate/getAllCandidates');
  }

  getAllCompanies():()=>Observable<Company[]>
  {
    return ()=>this.http.get<Company[]>(this.baseURL +'/company/getAllCompanies');
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
      
      this.router.navigate(['/logIn']);
    } catch (error) {
      console.error('Error removing items:', error);
    }
  }
}
