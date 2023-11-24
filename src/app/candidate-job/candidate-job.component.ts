import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Application, Candidate, Job } from '../model';
import { ToasterService } from '../services/toaster.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-job',
  templateUrl: './candidate-job.component.html',
  styleUrls: ['./candidate-job.component.css'],
})
export class CandidateJobComponent implements OnInit {
   allJobs: Job[] = [];
   filteredJobs:Job[]=[];
  showSidebar: boolean = false;
  application: Application = {} as Application;
  username: any = localStorage.getItem('username');
  currentCandidate!: Candidate;
  sameCandidate:boolean = false;
  jobApplications:Application[] = [];
  hybridChecked:boolean = false;
  onSiteChecked:boolean=false;
  remoteChecked:boolean=false; 
  softwareDeveloperChecked:boolean = false;
  businessAnalystChecked:boolean=false;
  testerChecked:boolean=false;

  constructor(private signupService: SignUpService, private toasterService : ToasterService,private router:Router) {}
 

  ngOnInit() {
    this.signupService.getCurrentCandidate(this.username).subscribe((data) => {
      this.currentCandidate = data;

     
    });

    const getJobs = this.signupService.getAllJobs();

    const observable1 = getJobs();
    observable1.subscribe((data: Job[]) => {
      this.allJobs = data;
      this.filteredJobs = data;
      
    });

   
  }

  onCheckboxChange()
  {
    const anyCheckboxChecked =
    this.remoteChecked || this.onSiteChecked || this.hybridChecked ||this.businessAnalystChecked
     || this.softwareDeveloperChecked || this.testerChecked;

  this.filteredJobs = anyCheckboxChecked
    ? this.allJobs.filter((item) => {
        return (
          (this.remoteChecked && item.location === 'Remote') ||
          (this.onSiteChecked && item.location === 'On-Site') ||
          (this.hybridChecked && item.location === 'Hybrid') ||
          (this.businessAnalystChecked && item.role.split(' ').join('').toLowerCase() === 'businessanalyst') ||
          (this.softwareDeveloperChecked && item.role.split(' ').join('').toLowerCase() === 'softwaredeveloper') ||
          (this.testerChecked && item.role.split(' ').join('').toLowerCase() === 'tester')
        );
      })
    : [...this.allJobs];
  }

  sidebar() {
   
    this.showSidebar = !this.showSidebar;
  }

  logOut() {
    this.signupService.logOut();
  }

  applyForJob(aJob:Job){
    const result = window.confirm('Do you want to continue?');
    if (result) {
      this.apply(aJob);
    } else {
     
    }
  }

  apply(aJob: Job) {
   // alert("This will submit your application for this job");

   
    this.toasterService.showNotification('Application Submitted successfully');
    
    this.application.job = aJob;
    this.application.active = true;
    this.application.status = 'Pending';
    this.application.user = this.currentCandidate;
    const isoDateString = new Date().toISOString();
   this.application.applyDate = isoDateString.substring(0,10);

    this.signupService.postApplication(this.application).subscribe((
      {
      next:(val)=>
      {
         
      }
    }
     ));

    
  }

   getApplicationsViaJob(jobId:number)
   {
    const navigationExtras: NavigationExtras = {
      queryParams: { jobId: jobId }
    };
     this.router.navigate(['/jobApplications'],navigationExtras);
    
   }
  deleteJob(jobId:number)
  {
    
    this.signupService.deleteJob(jobId).subscribe(
      () => {
        
        const index = this.allJobs.findIndex(job => job.id === jobId);
        
          this.allJobs.splice(index, 1);
       
      },
      error => {
        console.error('Error deleting application:', error);
      }
    );

    this.toasterService.showNotification("Job deleted successfully");
  }
}
