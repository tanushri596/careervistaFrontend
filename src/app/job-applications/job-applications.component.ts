import { Component, OnInit } from '@angular/core';
import { Application, Candidate, CandidateDto, Chat, Company, CompanyDto } from '../model';
import { SignUpService } from '../services/sign-up.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit
 {

  currentCandidate!:CandidateDto;
  currentCompany!:CompanyDto;
  candidateDesignation!:string;
  candidateName!:string;
  jobApplications:Application[] = [];
  showSidebar:boolean = false;
  jobName:string="";
  selectedStatus:string="Pending";
  currentChat:Chat={} as Chat;
  username:any = localStorage.getItem('username');
  AllChats:any = [];
  role:any= localStorage.getItem('role');
  p:number = 1;
  itemsPerPage :number = 5;
  
  

  constructor(private signupService : SignUpService,private route:ActivatedRoute){}

  ngOnInit(): void 
  {
    if(localStorage.getItem('role')=='candidate')
    {
    this.signupService.getCurrentCandidate(this.username).subscribe(
      data=>
      {
         this.currentCandidate = data;
         this.candidateDesignation = data.designation;
         this.candidateName = data.firstName;

        
        
         
      })
    }
    else
    {
    this.signupService.getCurrentCompany(this.username).subscribe(
      data=>
      {
         this.currentCompany = data;
        
         
      })
    }

    this.route.queryParams.subscribe(params => {
     
      const jobId = params['jobId'];
  
      this.signupService.getAllApplicationsViaJob(jobId).subscribe((data:Application[])=>
      {
        console.log(data);
        this.jobApplications = data.sort((a, b) => {
           const dateA = new Date(a.applyDate);
          const dateB = new Date(b.applyDate);
  
           return dateB.getTime() - dateA.getTime();
      });
        this.jobName = data[0].jobDto.role;
      //   console.log(data);
      })
      
      
     
    });

    

  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

 

  updateStatus(appId:number,appStatus:string)
  {
   
    this.signupService.updateStatus(appStatus,appId).subscribe(
      (response) => {
        console.log('Update successful:', response);
        
      },
      (error) => {
        console.error('Update failed:', error);
        
      }
    );
    
  }
  addToChat(receiver:CandidateDto)
  {
   this.currentChat.sender = this.currentCandidate;
   this.currentChat.receiver = receiver;

   
    
    this.signupService.addChat(this.currentChat).subscribe();
  }
  sidebar()
  {
    this.showSidebar = !this.showSidebar;
  }

  logOut()
  {
    this.signupService.logOut();
  }

}
