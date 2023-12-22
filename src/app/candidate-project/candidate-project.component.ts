import { Component, OnInit } from '@angular/core';
import { Candidate, CandidateDto, Project } from '../model';
import { SignUpService } from '../services/sign-up.service';
import { ToasterService } from '../services/toaster.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-candidate-project',
  templateUrl: './candidate-project.component.html',
  styleUrls: ['./candidate-project.component.css']
})
export class CandidateProjectComponent implements OnInit
{
  currentCandidate!:CandidateDto;
  projects:Project[] = [];
  showSidebar:boolean = false;
  username:any = localStorage.getItem("username");
  showDescriptionMap: { [id: number]: boolean } = {};
  yearDifference:number=0;
  currentDate:Date=new Date();
  

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
         
        
        const getProjects = this.signUpService.getProjects(data.id);
        const observable1 = getProjects();
        observable1.subscribe((data: Project[]) => {
          this.projects = data;

          console.log(this.projects);
          
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

    console.log(this.yearDifference);

    if (this.yearDifference < 60 && this.yearDifference >= 0) return false;
    return true;
  }

  differenceValidator(startDate:string,endDate:string):boolean
  {
      return new Date(startDate) > new Date(endDate);
  }
  sidebar()
  {
    this.showSidebar = !this.showSidebar;
  }

  toggleDescription(proId:number)
  {
    this.showDescriptionMap[proId] = !this.showDescriptionMap[proId];
  }

  addProject(projectData : Project)
  {
   this.toasterService.showNotification('Project added successfully!');
  
   projectData.userId = this.currentCandidate.id;
   //this.projects.push(projectData);
   console.log(projectData);
   this.signUpService.addProject(projectData).subscribe(
    {
    next:(val)=>
    {
       
    }
  }
   )
   this.signUpService.getCurrentCandidate(this.username).subscribe(
    data=>
    {
       
      
      const getProjects = this.signUpService.getProjects(data.id);
      const observable1 = getProjects();
      observable1.subscribe((data: Project[]) => {
        this.projects = data;

        console.log(this.projects);
        
      });
    })
  }

  openSweetAlert(proId:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProject(proId);
      }
    });
  }

  deleteProject(proId:number)
  {
    console.log("this is called");
       this.signUpService.deleteProject(proId).subscribe
       (
        () => {
        
          const index = this.projects.findIndex(p => p.id === proId);
          
            this.projects.splice(index, 1);
         
        },
        error => {
          console.error('Error deleting application:', error);
        }
      );
  
      this.toasterService.showNotification("Project deleted successfully");
       
  }

  logOut()
  {
    this.signUpService.logOut();
  }
}
