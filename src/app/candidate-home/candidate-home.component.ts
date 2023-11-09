import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, Education, Experience, Job, Project } from '../model';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-candidate-home',
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.css']
})
export class CandidateHomeComponent implements OnInit
 {

  currentCandidate!:Candidate;
  username:any = localStorage.getItem("username");
  candidateDesignation!:string;
  selectedLocation!:string;
  candidateName!:string;

  

  constructor(private router : Router,private signupService : SignUpService, private toasterService : ToasterService){}

  ngOnInit()
  {
    setInterval(()=>
    {
      if(!this.signupService.authenticateToken())
      this.signupService.logOut();

    },5000);

    this.signupService.getCurrentCandidate(this.username).subscribe(
      data=>
      {
         this.currentCandidate = data;
         this.candidateDesignation = data.designation;
         this.candidateName = data.firstName;
        
         console.log(this.currentCandidate);
      })

    
      
  }

  postJob(jobData : Job)
  {
    this.toasterService.showNotification('Job posted successfully!');
    jobData.company = this.currentCandidate.company ;
    jobData.user = this.currentCandidate;



    this.signupService.addJobBycandidate(jobData).subscribe
    ({

      next:(val)=>
      {
        console.log(jobData);
      }

    })
     
   }

   addEducation(edudata : Education)
   {
    this.toasterService.showNotification('Education added successfully!');
      edudata.user = this.currentCandidate;
       this.signupService.addEducation(edudata).subscribe(
        {
        next:(val)=>
        {
           console.log(val);
        }
      }
       )
   }

   addProject(projectData : Project)
   {
    this.toasterService.showNotification('Project added successfully!');
    projectData.user = this.currentCandidate;
    console.log(projectData);
    this.signupService.addProject(projectData).subscribe(
     {
     next:(val)=>
     {
        
     }
   }
    )
   }

   addExperience(experienceData : Experience)
   {
    this.toasterService.showNotification('Experience added successfully!');
    experienceData.user = this.currentCandidate;
    //console.log(projectData);
    this.signupService.addExperience(experienceData).subscribe(
     {
     next:(val)=>
     {
        
     }
   }
    )
   }

  logOut() {
   this.signupService.logOut();
  }
  

}
