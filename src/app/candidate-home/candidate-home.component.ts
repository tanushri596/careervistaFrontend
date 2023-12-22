import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';
import { Application, Candidate, CandidateDto, Education, Experience, Job, Project } from '../model';
import { ToasterService } from '../services/toaster.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-candidate-home',
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.css']
})
export class CandidateHomeComponent implements OnInit
 {

  currentCandidate!:CandidateDto;
  username:any = localStorage.getItem("username");
  candidateDesignation!:string;
  selectedLocation!:string;
  candidateName!:string;
  showSidebar:boolean=false;
  educations:Education[]=[];
  experiences:Experience[]=[];
  projects:Project[]=[];
  data: any;
  options: any;
  data1:any;
  options1:any;
  allTheJobs:Job[]=[];
  allApplications:Application[]=[];
  Remote:number = 0;
  Hybrid:number = 0;
  OnSite:number = 0;
  Rejected:number = 0;
  Pending:number = 0;
  Accepted:number = 0;

 

  

  constructor(private router : Router,private signupService : SignUpService, private toasterService : ToasterService){}

  ngOnInit()
  {
    setInterval(()=>
    {
      if(!this.signupService.authenticateToken())
      this.signupService.logOut();

    },60000);

    this.signupService.getAllTheJobs().subscribe(
      (jobs:Job[])=>{
        this.allTheJobs = jobs;
           console.log(this.allTheJobs);

           this.Remote = this.allTheJobs.filter(job => job.location === 'Remote').length;
           this.Hybrid = this.allTheJobs.filter(job => job.location === 'Hybrid').length;
           this.OnSite = this.allTheJobs.filter(job => job.location === 'On-Site').length;
    
         if(this.Remote || this.Hybrid || this.OnSite)
         {  
          this.data = {
            labels: ['Remote', 'Hybrid', 'On-Site'],
            datasets: [
                {
                    data: [this.Remote,this.Hybrid,this.OnSite],
                    backgroundColor: [
                        '#164863',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverBackgroundColor: [
                        '#164863',
                        'rgb(54, 142, 196)',
                        'rgb(255, 185, 73)'
                    ]
                }
            ]
        };
      }
      else
      {
        this.data = {
          labels: ['No JObs'],
          datasets: [
              {
                  data: [1],
                  backgroundColor: [
                      'grey',
                     
                  ],
                  hoverBackgroundColor: [
                      'grey',
                     
                  ]
              }
          ]
      };
      }
        
        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        
                    }
                }
            }
        };

          }

    )

    this.signupService.getCurrentCandidate(this.username).subscribe(
      data=>
      {
         this.currentCandidate = data;
         this.candidateDesignation = data.designation;
         this.candidateName = data.firstName;
        
         this.signupService.getAllApplications(this.currentCandidate.id)
         .subscribe((data: Application[]) => {
           this.allApplications = data;

           this.Rejected = this.allApplications.filter(a => a.status === 'Rejected').length;
           this.Pending = this.allApplications.filter(a => a.status === 'Pending').length;
           this.Accepted = this.allApplications.filter(a => a.status === 'Accepted').length;

           if(this.Accepted || this.Pending || this.Rejected)
         {  this.data1 = {
            labels: ['Rejected', 'Accepted', 'Pending'],
            datasets: [
                {
                    data: [this.Rejected,this.Accepted, this.Pending],
                    backgroundColor: [
                      '#F9D923',
                      '#36AE7C',
                      '#187498'
                    ],
                    hoverBackgroundColor: [
                      '#F9D923',
                      '#36AE7C',
                      '#187498',
                      
                    ]
                }
            ]
        };
      }
      else{
        this.data1 = {
          labels: ['No Application'],
          datasets: [
              {
                  data: [1],
                  backgroundColor: [
                    'grey'
                  ],
                  hoverBackgroundColor: [
                    'grey'
                    
                  ]
              }
          ]
      };
      }
        
        this.options1 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        
                    }
                }
            }
        };
    
           
         });
      })

      this.signupService.getCurrentCandidate(this.username).subscribe(
        data=>
        {
           
          
          const getEducations = this.signupService.getEducations(data.id);
          const observable1 = getEducations();
          observable1.subscribe((data: Education[]) => {
            this.educations = data;
  
            
            
          });
        })

        this.signupService.getCurrentCandidate(this.username).subscribe(
          data=>
          {
             
            
            const getExperiences = this.signupService.getExperiences(data.id);
            const observable1 = getExperiences();
            observable1.subscribe((data: Experience[]) => {
              this.experiences = data;
    
             
              
            });
          })
          this.signupService.getCurrentCandidate(this.username).subscribe(
            data=>
            {
               
              
              const getProjects = this.signupService.getProjects(data.id);
              const observable1 = getProjects();
              observable1.subscribe((data: Project[]) => {
                this.projects = data;
        
                
              });
            })

           
           
            
         

  }

  
   
   sidebar()
   {
      this.showSidebar = !this.showSidebar;
   }





  logOut() {
   this.signupService.logOut();
  }
  

}
