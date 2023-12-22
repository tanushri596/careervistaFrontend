import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import * as SockJs from 'sockjs-client';
import * as StompJs from 'stompjs';

import { Application, Candidate, CandidateDto, Chat, Company, CompanyDto, Education, Experience, Job, Message, Page, Project, logIn } from '../model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})


export class SignUpService {
  constructor(private http: HttpClient, private jwtHelper : JwtHelperService,private router:Router) {}

  private dataSubject = new BehaviorSubject<any>(true);
  data$ = this.dataSubject.asObservable();
  private baseURL = `http://localhost:8080`;
  socket = new SockJs("http://localhost:8080/stomp-endpoint");
  stompClient = StompJs.over(this.socket);
   token = localStorage.getItem("token");


  //candidate apis

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  addChat(data:Chat)
  {
    
    return this.http.post(this.baseURL+'/candidate/addChat',data);
  }

  getAllChats(userId:number)
  {
    console.log("chats are showed");
     return this.http.get(`${this.baseURL}/candidate/getChats/${userId}`);
  }

  sendMessage(channel:string,message:Message)
  {
   
    if(message.message.trim()!='')
    this.stompClient.send("/app/hello/" + channel, {}, JSON.stringify({channel:message.channel,message:message.message,sender:message.sender,receiver:message.receiver,time:message.time}));

  }

  getAllMessages(channel: string): Observable<Message[]> {
  return this.http.get<Message[]>(`${this.baseURL}/getMessage/${channel}`
  );
}
 

  addCandidate(data: any) {
    return this.http.post(this.baseURL + '/candidate/signUp', data);
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

  getCurrentCandidate(username: string): Observable<CandidateDto> {
   
    
    return this.http.get<CandidateDto>(
      `${this.baseURL}/candidate/getCandidateByUsername/${username}`
    );
  }

  

  getCandidate(username: string): Observable<boolean> {
    
    return this.http.get<boolean>(`${this.baseURL}/candidate/getCandidateViaUsername/${username}`);
  }

  
 updateCandidate(currentCandidate:CandidateDto)
 {
   return this.http.put(`${this.baseURL}/candidate/updateCandidate/${currentCandidate.username}`,currentCandidate)
 }


  


 getAllJobs(page: number, size: number, roles?: string[], locations?: string[]): Observable<Page<Job>> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  // Add roles and locations to the params if provided
  if (roles && roles.length > 0) {
    params = params.set('roles', roles.join(','));
  }

  if (locations && locations.length > 0) {
    params = params.set('locations', locations.join(','));
  }

  return this.http.get<Page<Job>>(`${this.baseURL}/candidate/getAllActiveJobs`, { params });
}

getAllTheJobs(): Observable<Job[]> {
  return this.http.get<Job[]>(this.baseURL + "/candidate/getAllTheJobs")
    .pipe(
      tap(),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      })
    );
}

  removeJob(jobId:number,status:boolean)
  {
    
   return this.http.patch(`${this.baseURL}/candidate/removeJob/${jobId}`,status);
  }

  postApplication(application:Application)
  {
    console.log(application);
    return this.http.post(this.baseURL+'/candidate/addApplications',application);
  }

  getAllApplications(userId:number):Observable<Application[]>
  {
    return this.http.get<Application[]>(`${this.baseURL}/candidate/getApplicationsByUserId/${userId}`);
 
  }

  getAllApplicationsViaJob(jobId:number):Observable<Application[]>
  {
    return this.http.get<Application[]>(`${this.baseURL}/candidate/getApplicationsByJobId/${jobId}`);
 
  }

  updateStatus(status:string,appId:number) : Observable<any>
  {
     return this.http.patch<any>(`${this.baseURL}/candidate/updateApplicationStatus/${appId}`,status);
  }

  withdrawApplication(appId:number,withdraw:boolean)
  {
    
   return this.http.patch(`${this.baseURL}/candidate/updateApplicationWithdrawStatus/${appId}`,withdraw);
  }

  //company apis

  addCompany(data: any) {
    return this.http.post(this.baseURL + '/company/signUp', data);
  }

  getCurrentCompany(username: string): Observable<CompanyDto> {
    return this.http.get<CompanyDto>(`${this.baseURL}/company/getCompanyByUsername/${username}`);
  }
  getCompany(username: string): Observable<boolean> {
    
    return this.http.get<boolean>(`${this.baseURL}/company/getCompanyViaUsername/${username}`);
  }
  getAllCompanies():()=>Observable<Company[]>
  {
    return ()=>this.http.get<Company[]>(this.baseURL +'/company/getAllCompanies');
  }

  getEmployeesByCompany(compId:number):Observable<Candidate[]>
  {
    return this.http.get<Candidate[]>(`${this.baseURL}/company/getEmployees/${compId}`);
 
  }
  getJobsByCompany(compId:number):Observable<Job[]>
  {
    return this.http.get<Job[]>(`${this.baseURL}/company/getJobs/${compId}`);

  }

  getJobsByCandidate(candId:number):Observable<Candidate[]>
  {
    return this.http.get<Candidate[]>(`${this.baseURL}/candidate/getJobsByUserId/${candId}`)
  }

  getAllApplicationsViaCompany(compId:number):Observable<Application[]>
  {
    return this.http.get<Application[]>(`${this.baseURL}/candidate/getApplicationsByCompId/${compId}`);
 
  }

  updateCandidateStatus(status:string,candId:number) : Observable<any>
  {
     return this.http.patch<any>(`${this.baseURL}/company/updateCandidateStatus/${candId}`,status);
  }

  deleteCandidate(candId:number)
  {
    return this.http.delete(`${this.baseURL}/candidate/deleteUser/${candId}`);
 
  }

  //logout
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
