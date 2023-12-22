import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Application, Candidate, CandidateDto, Job, Page } from '../model';
import { ToasterService } from '../services/toaster.service';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2'

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
  currentCandidate!: CandidateDto;
  currentCandidateId!:number;
  sameCandidate:boolean = false;
  jobApplications:number[] = [];
  hybridChecked:boolean = false;
  onSiteChecked:boolean=false;
  remoteChecked:boolean=false; 
  softwareDeveloperChecked:boolean = false;
  businessAnalystChecked:boolean=false;
  testerChecked:boolean=false;
  p: number = 1; 
  itemsPerPage: number = 4; 
  totalItems:number = 0;
  totalPages:number = 0;
 

  constructor(private signupService: SignUpService, private toasterService : ToasterService,private router:Router) {}
 

  ngOnInit() {
    this.signupService.getCurrentCandidate(this.username).subscribe((data) => {
      this.currentCandidate = data;
      this.currentCandidateId = data.id;

      this.signupService.getAllApplications(this.currentCandidateId).subscribe(
        data=>
        {
         data.forEach(application => {
           if (application.jobDto && application.jobDto.id) {
             this.jobApplications.push(application.jobDto.id);
           }
         });
         
        } 
       )
     
    });

    this.signupService.getAllJobs(this.p - 1,this.itemsPerPage).subscribe(
      (page: Page<Job>) => {
      
        this.allJobs = page.content;
        this.filteredJobs = page.content;
        this.totalItems = page.totalElements;
        this.totalPages = page.totalPages
           
      }
    )

   

   

   
  }

  onPageChange(pageNumber: number): void {
   
    this.p = pageNumber;

    
     this.applyFilter(pageNumber);
  }

  
  

  // onCheckboxChange()
  // {
   
  //  // this.p = 1;
  //   const anyCheckboxChecked =
  //   this.remoteChecked || this.onSiteChecked || this.hybridChecked ||this.businessAnalystChecked
  //    || this.softwareDeveloperChecked || this.testerChecked;

  // this.filteredJobs = anyCheckboxChecked
  //   ? this.allJobs.filter((item) => {
  //       return (
  //         (this.remoteChecked && item.location === 'Remote') ||
  //         (this.onSiteChecked && item.location === 'On-Site') ||
  //         (this.hybridChecked && item.location === 'Hybrid') ||
  //         (this.businessAnalystChecked && item.role.split(' ').join('').toLowerCase() === 'businessanalyst') ||
  //         (this.softwareDeveloperChecked && item.role.split(' ').join('').toLowerCase() === 'softwaredeveloper') ||
  //         (this.testerChecked && item.role.split(' ').join('').toLowerCase() === 'tester')
  //       );
  //     })
  //   : [...this.allJobs];

  //   this.totalItems = this.filteredJobs.length;
  //   console.log("total Items"+ this.totalItems);
  // }


  applyFilter(pageNumber:number) {
    let selectedRoles=[];
    if(this.softwareDeveloperChecked)selectedRoles.push('software developer');
    if(this.testerChecked)selectedRoles.push('tester');
    if(this.businessAnalystChecked)selectedRoles.push('business analyst');

    let selectedLocations = [];
    if(this.remoteChecked)selectedLocations.push('Remote');
    if(this.hybridChecked)selectedLocations.push('Hybrid');
    if(this.onSiteChecked)selectedLocations.push('On-Site');

   this.p = pageNumber;
    this.signupService.getAllJobs(this.p-1, this.itemsPerPage, selectedRoles, selectedLocations).subscribe(
      (page: Page<Job>) => {
       
       
          this.allJobs = page.content;
        this.filteredJobs = page.content;
        console.log(this.filteredJobs);
        this.totalItems = page.totalElements;
      },
      (error) => {
        
        console.error('Error fetching filtered jobs', error);
      }
    );
  }
  
  
  
  

  

  sidebar() {
   
    this.showSidebar = !this.showSidebar;
  }



  logOut() {
    this.signupService.logOut();
  }

  openSweetAlert1(job:Job) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Apply!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apply(job);
      }
    });
  }

  

  apply(aJob: Job) {
   // alert("This will submit your application for this job");

   
    this.toasterService.showNotification('Application Submitted successfully');
    
    this.application.jobDto = aJob;
    this.application.active = true;
    this.application.withdrawn = false;
    this.application.status = 'Pending';
    this.application.userDto = this.currentCandidate;
    this.application.companyId = aJob.companyId;
    this.application.role = aJob.role;
    this.application.companyName = aJob.companyName;
    const isoDateString = new Date().toISOString();
   this.application.applyDate = isoDateString.substring(0,10);

   console.log(this.application.jobDto);

    this.signupService.postApplication(this.application).subscribe();
 this.jobApplications.push(aJob.id);


    
  }

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
        const index = this.filteredJobs.findIndex(job => job.id === jobId);
          
        this.filteredJobs.splice(index, 1);
        
       
      },
      error => {
        console.error('Error deleting application:', error);
      }
    );

    this.toasterService.showNotification("Job removed successfully");
  }
}
