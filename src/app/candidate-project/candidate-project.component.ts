import { Component, OnInit } from '@angular/core';
import { Candidate, Project } from '../model';
import { SignUpService } from '../services/sign-up.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-candidate-project',
  templateUrl: './candidate-project.component.html',
  styleUrls: ['./candidate-project.component.css']
})
export class CandidateProjectComponent implements OnInit
{
  currentCandidate!:Candidate;
  projects:Project[] = [];
  showSidebar:boolean = false;
  username:any = localStorage.getItem("username");
  showDescriptionMap: { [id: number]: boolean } = {};
  

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
  
   projectData.user = this.currentCandidate;
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

  delete(proId:number){
    const result = window.confirm('Do you want to delete?');
    if (result) {
     this.deleteProject(proId);
    } else {
      
    }
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
