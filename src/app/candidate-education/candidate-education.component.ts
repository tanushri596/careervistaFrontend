import { Component } from '@angular/core';
import { Candidate, Education } from '../model';
import { SignUpService } from '../services/sign-up.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-candidate-education',
  templateUrl: './candidate-education.component.html',
  styleUrls: ['./candidate-education.component.css']
})
export class CandidateEducationComponent 
{
  educations:Education[]=[];
  showSidebar:boolean = false;
  username:any = localStorage.getItem("username");
  currentCandidate!:Candidate;

  constructor(private signUpService:SignUpService,private toasterService:ToasterService){}

  ngOnInit()
  {
    this.signUpService.getCurrentCandidate(this.username).subscribe(
      data=>
      {
         this.currentCandidate = data;
       
        
         console.log(this.currentCandidate);
      })
    this.signUpService.getCurrentCandidate(this.username).subscribe(
      data=>
      {
         
        
        const getEducations = this.signUpService.getEducations(data.id);
        const observable1 = getEducations();
        observable1.subscribe((data: Education[]) => {
          this.educations = data;

          
          
        });
      })
    
  }

  addEducation(edudata : Education)
  {
   this.toasterService.showNotification('Education added successfully!');
     edudata.user = this.currentCandidate;
      this.signUpService.addEducation(edudata).subscribe(
       {
       next:(val)=>
       {
        this.signUpService.getCurrentCandidate(this.username).subscribe(
          data=>
          {
             
            
            const getEducations = this.signUpService.getEducations(data.id);
            const observable1 = getEducations();
            observable1.subscribe((data: Education[]) => {
              this.educations = data;
    
              
              
            });
          })
       }
     }
      )
  }

  delete(eduId:number)
  {
    const result = window.confirm("Do you want to delete ?");
    if(result)
    {
      this.deleteEducation(eduId);
    }
  }

  deleteEducation(eduId:number)
  {
    this.signUpService.deleteEducation(eduId).subscribe
       (
        () => {
        
          const index = this.educations.findIndex(ed => ed.id === eduId);
          
            this.educations.splice(index, 1);
         
        },
        error => {
          console.error('Error deleting application:', error);
        }
      );
  
      this.toasterService.showNotification("Education deleted successfully");
 
  }

  sidebar()
  {
    this.showSidebar = !this.showSidebar;
  }

  logOut()
  {
    this.signUpService.logOut();
  }
}
