import { Component } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, CandidateDto, Experience } from '../model';
import { ToasterService } from '../services/toaster.service';
import Swal from 'sweetalert2'

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
  currentCandidate!:CandidateDto;
  yearDifference:number = 0;



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
dateValidator(startDate: string): boolean {
  const inputDate = new Date(startDate);
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

  

  if (this.yearDifference < 60 && this.yearDifference >= 0) return false;
  return true;
}

differenceValidator(startDate:string,endDate:string):boolean
{
    return new Date(startDate) > new Date(endDate);
}
addExperience(experienceData : Experience)
{
 this.toasterService.showNotification('Experience added successfully!');
 experienceData.userId = this.currentCandidate.id;
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

openSweetAlert(expId:number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteExperience(expId);
    }
  });
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
