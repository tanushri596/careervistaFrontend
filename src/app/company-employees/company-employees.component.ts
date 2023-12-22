import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, Company, CompanyDto } from '../model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-employees',
  templateUrl: './company-employees.component.html',
  styleUrls: ['./company-employees.component.css']
})
export class CompanyEmployeesComponent implements OnInit
 {

  currentCompany!:CompanyDto;
  username:any = localStorage.getItem('username');
  allEmployees:Candidate[]=[];
  candidateJobs!:number;
  p:number = 1;
  itemsPerPage:number = 5;

  constructor(private signupService:SignUpService){}

  ngOnInit()
  {
   

    this.signupService.getCurrentCompany(this.username).subscribe(
      data=>
      {
         this.currentCompany = data;
        
         this.signupService.getEmployeesByCompany(this.currentCompany.id).subscribe(
          data2=>
          {
            this.allEmployees = data2;
            console.log(data2);
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

  updateCandidateStatus(empId:number,empStatus:string)
  {
    this.signupService.updateCandidateStatus(empStatus,empId).subscribe(
      (response) => {
        console.log('Update successful:', response);
        
      },
      (error) => {
        console.error('Update failed:', error);
        
      }
    );
  }

  openSweetAlert(candId:number)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCandidate(candId);
      }
    });
  }

 deleteCandidate(candId:number)
 {
     this.signupService.deleteCandidate(candId).subscribe(
     ()=>{ const index = this.allEmployees.findIndex(emp => emp.id === candId);
        
          this.allEmployees.splice(index, 1);
     },
     error => {
      console.error('Error deleting application:', error);
    }
     );
 }

  logOut() {
   this.signupService.logOut();
  }
}
