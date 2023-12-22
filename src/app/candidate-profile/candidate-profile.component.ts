import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, CandidateDto, Job } from '../model';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit
{
   showSidebar:boolean = false;
   username:any = localStorage.getItem('username');
   currentCandidate!:CandidateDto;
   selectedLocation!:string;
   yearDifference: number = 0;
  

   constructor(private signUpService:SignUpService,private toasterService:ToasterService){};

   ngOnInit()
   {
    this.signUpService.getCurrentCandidate(this.username).subscribe(
      data=>
      {
         this.currentCandidate = data;
       
        
         console.log(this.currentCandidate);
      })
   }

   sidebar()
   {
    this.showSidebar = !this.showSidebar;
   }

   

   phoneNumberValidator(phoneNumber: string): boolean {
    const regex = /^\d{10}$/;

    if (phoneNumber.match(regex)) {
      return true;
    } else {
      return false;
    }

    return true;
  }

  birthDateValidator(birthDate: string): boolean {
    const inputDate = new Date(birthDate);
    const comparisonDate = new Date();

    this.yearDifference =
      comparisonDate.getFullYear() - inputDate.getFullYear();

    if (
      comparisonDate.getMonth() < inputDate.getMonth() ||
      (comparisonDate.getMonth() === inputDate.getMonth() &&
        comparisonDate.getDate() < inputDate.getDate())
    ) {
      this.yearDifference--;
    }

    if (this.yearDifference < 18) return false;
    return true;
  }

   saveChanges()
   {
   
    this.signUpService.updateCandidate(this.currentCandidate).subscribe();
     console.log(this.currentCandidate);
   }

  
  

   postJob(jobData : Job)
  {
    this.toasterService.showNotification('Job posted successfully!');
    jobData.companyId = this.currentCandidate.companyId ;
    jobData.userId = this.currentCandidate.id;
    jobData.postDate = new Date().toISOString().substring(0,10);
    jobData.status = true;
    

  
    this.signUpService.addJobBycandidate(jobData).subscribe
    ({

      next:(val)=>
      {
        console.log(jobData);
      }

    })
     
   }

   logOut()
   {
     this.signUpService.logOut();
   }
}
