import { Component } from '@angular/core';
import { Candidate, CandidateDto, Education } from '../model';
import { SignUpService } from '../services/sign-up.service';
import { ToasterService } from '../services/toaster.service';
import Swal from 'sweetalert2';

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
         
        
        const getEducations = this.signUpService.getEducations(data.id);
        const observable1 = getEducations();
        observable1.subscribe((data: Education[]) => {
          this.educations = data;

          
          
        });
      })
    
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
  
    
  
    if (this.yearDifference < 60) return false;
    return true;
  }
  
  differenceValidator(startDate:string,endDate:string):boolean
  {
      return new Date(startDate) > new Date(endDate);
  }

  addEducation(edudata : Education)
  {
   this.toasterService.showNotification('Education added successfully!');
     edudata.userId = this.currentCandidate.id;
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

  openSweetAlert(eduId:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor:'#BE3144',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEducation(eduId);
      }
    });
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
