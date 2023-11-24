import { Component } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, Experience } from '../model';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-candidate-experience',
  templateUrl: './candidate-experience.component.html',
  styleUrls: ['./candidate-experience.component.css']
})
export class CandidateExperienceComponent {
  
  experiences:Experience[]=[];
  showSidebar:boolean = false;
  username:any = localStorage.getItem("username");
  showDescriptionMap: { [id: number]: boolean } = {};
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
         
        
        const getExperiences = this.signUpService.getExperiences(data.id);
        const observable1 = getExperiences();
        observable1.subscribe((data: Experience[]) => {
          this.experiences = data;

          console.log(this.experiences);
          
        });
      })
    
  }

  sidebar()
  {
    this.showSidebar = !this.showSidebar;
  }


  toggleDescription(itemId: number) {
    console.log(itemId);
    this.showDescriptionMap[itemId] = !this.showDescriptionMap[itemId];
}

addExperience(experienceData : Experience)
{
 this.toasterService.showNotification('Experience added successfully!');
 experienceData.user = this.currentCandidate;
 //console.log(projectData);
 this.signUpService.addExperience(experienceData).subscribe(
  {
  next:(val)=>
  {
    this.signUpService.getCurrentCandidate(this.username).subscribe(
      data=>
      {
         
        
        const getExperiences = this.signUpService.getExperiences(data.id);
        const observable1 = getExperiences();
        observable1.subscribe((data: Experience[]) => {
          this.experiences = data;
    
          console.log(this.experiences);
          
        });
      })
  }
}
 )
 
}

delete(expId:number)
{
  const result = window.confirm("Do you want to delete ?");

  if(result)
  {
    this.deleteExperience(expId);
  }
}

deleteExperience(expId:number)
{
  this.signUpService.deleteExperience(expId).subscribe
       (
        () => {
        
          const index = this.experiences.findIndex(ex => ex.id === expId);
          
            this.experiences.splice(index, 1);
         
        },
        error => {
          console.error('Error deleting application:', error);
        }
      );
  
      this.toasterService.showNotification("Experience deleted successfully");
 
}

  logOut()
  {
    this.signUpService.logOut();
  }

}
