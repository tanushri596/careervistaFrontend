import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Application, Candidate } from '../model';

@Component({
  selector: 'app-candidate-application',
  templateUrl: './candidate-application.component.html',
  styleUrls: ['./candidate-application.component.css'],
})
export class CandidateApplicationComponent implements OnInit {
  showSidebar: boolean = false;
  allApplications: Application[] = [];
  username: any = localStorage.getItem('username');
  currentCandidate: Candidate = {} as Candidate;
  currentCandidateId!: number;

  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.signUpService.getCurrentCandidate(this.username).subscribe((data) => {
      this.currentCandidate = data;

      this.currentCandidateId = this.currentCandidate.id;

      const getApplications = this.signUpService.getAllApplications(this.currentCandidateId);
      const observable1 = getApplications();
      observable1.subscribe((data: Application[]) => {
        this.allApplications = data;
        
      });

    });

    

  
  }

  sidebar() {
    this.showSidebar = !this.showSidebar;
  }

  delete(appId:number)
  {
    const result = window.confirm("Do you want to delete ?")

    if(result)
    {
       this.deleteApplication(appId);
    }
    
  }

  deleteApplication(appId:number)
  {
    this.signUpService.deleteApplication(appId).subscribe(
      () => {
        
        const index = this.allApplications.findIndex(app => app.id === appId);
        
          this.allApplications.splice(index, 1);
       
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
