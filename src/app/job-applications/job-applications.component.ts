import { Component, OnInit } from '@angular/core';
import { Application } from '../model';
import { SignUpService } from '../services/sign-up.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit
 {

  jobApplications:Application[] = [];
  showSidebar:boolean = false;
  jobName:string="";
  selectedStatus:string="Pending";
  

  constructor(private signupService : SignUpService,private route:ActivatedRoute){}
  ngOnInit(): void 
  {

    this.route.queryParams.subscribe(params => {
     
      const jobId = params['jobId'];
  
      const getApplications = this.signupService.getAllApplicationsViaJob(jobId);
      const observable = getApplications();
      observable.subscribe((data:Application[])=>
      {
        this.jobApplications = data;
        this.jobName = data[0].job.role;
        console.log(data);
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
  sidebar()
  {
    this.showSidebar = !this.showSidebar;
  }

  logOut()
  {
    this.signupService.logOut();
  }

}
