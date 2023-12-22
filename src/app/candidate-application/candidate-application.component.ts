import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Application, Candidate, CandidateDto } from '../model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-candidate-application',
  templateUrl: './candidate-application.component.html',
  styleUrls: ['./candidate-application.component.css'],
})
export class CandidateApplicationComponent implements OnInit {
  showSidebar: boolean = false;
  allApplications: Application[] = [];
  username: any = localStorage.getItem('username');
  currentCandidate: CandidateDto = {} as CandidateDto;
  currentCandidateId!: number;
  itemsPerPage:number = 5;
 p:number = 1;

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpService.getCurrentCandidate(this.username).subscribe((data) => {
      this.currentCandidate = data;

      this.currentCandidateId = this.currentCandidate.id;

      this.signUpService.getAllApplications(this.currentCandidateId)
      .subscribe((data: Application[]) => {
        this.allApplications = data.sort((a, b) => {
            const dateA = new Date(a.applyDate);
          const dateB = new Date(b.applyDate);
  
          
          return dateB.getTime() - dateA.getTime();
      });
        
      });

    });

    

  
  }

  sidebar() {
    this.showSidebar = !this.showSidebar;
  }

  openSweetAlert(appId:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, withdraw it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.withdrawApplication(appId);
      }
    });
  }

  withdrawApplication(appId:number)
  {
    let withdraw = true;
    this.signUpService.withdrawApplication(appId,withdraw).subscribe(
      () => {
        
        this.signUpService.getAllApplications(this.currentCandidateId)
        .subscribe((data: Application[]) => {
          this.allApplications = data.sort((a, b) => {
             const dateA = new Date(a.applyDate);
            const dateB = new Date(b.applyDate);
    
            
            return dateB.getTime() - dateA.getTime();
        });
          
        });
       
      },
      error => {
        console.error('Error deleting application:', error);
      }
    );
    
  }

  logOut() {
    this.signUpService.logOut();
  }
}
