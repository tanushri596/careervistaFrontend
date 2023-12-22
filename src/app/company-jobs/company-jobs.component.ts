import { Component } from '@angular/core';
import { Candidate, Company, CompanyDto, Job } from '../model';
import { SignUpService } from '../services/sign-up.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent 
{
  currentCompany!:CompanyDto;
  username:any = localStorage.getItem('username');
  allJobs:Job[]=[];
  candidateJobs!:number;
  p:number=1;
  itemsPerPage:number=5;
 

  constructor(private signupService:SignUpService,private router:Router,private toasterService:ToasterService){}

  ngOnInit()
  {
   

    this.signupService.getCurrentCompany(this.username).subscribe(
      data=>
      {
        
         this.currentCompany = data;
         this.signupService.getJobsByCompany(this.currentCompany.id).subscribe(
          data1=>
          {
            this.allJobs = data1;
           
            this.allJobs.sort((job1, job2) => {
              const date1 = new Date(job1.postDate);
              const date2 = new Date(job2.postDate);
              return date2.getTime() - date1.getTime();
            });
            
          }
        )
         
         
      })

     

      
  }

  // jobsPosted(empId:number):number
  // {
  //   let jobPosted = 0;
  //   this.signupService.getJobsByCandidate(empId).subscribe(
  //     data=>
  //     {
  //       console.log(data.length);
  //     }
  //   );

  //   return jobPosted;
  // }

  getApplicationsViaJob(jobId:number)
  {
   const navigationExtras: NavigationExtras = {
     queryParams: { jobId: jobId }
   };
    this.router.navigate(['/jobApplications'],navigationExtras);
   
  }

  openSweetAlert(jobId:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeJob(jobId);
      }
    });
  }
  removeJob(jobId:number)
  {
    
    this.signupService.removeJob(jobId,false).subscribe(
      () => {
        
      
       
      },
      error => {
        console.error('Error deleting application:', error);
      }
    );

    this.toasterService.showNotification("Job removed successfully");
  }

  logOut() {
   this.signupService.logOut();
  }
}
