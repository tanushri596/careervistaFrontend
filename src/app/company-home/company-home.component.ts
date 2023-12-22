import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Application, Candidate, CandidateDto, Company, CompanyDto, Job } from '../model';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit
 {
  showSidebar = false;
  currentCompany!:CompanyDto;
  username:any=localStorage.getItem('username');
  allJobs:Job[]=[];
  allApplications:Application[]=[];
  allEmployees:Candidate[]=[];
  chart:any;
  applicationsArray: number[] = new Array(12).fill(0);
  myJobArray: number[] = new Array(12).fill(0);
  
  currentYear: number=new Date().getFullYear();
  showDropdown:boolean=false;

  // Define an array of years
  years: number[] = []; 
  

  constructor(private signupService:SignUpService){}
  ngOnInit()
  {
    setInterval(()=>
    {
      if(!this.signupService.authenticateToken())
      this.signupService.logOut();

    },60000);

    this.signupService.getCurrentCompany(this.username).subscribe(
      data=>
      {
         this.currentCompany = data;

         for(let i = parseInt(this.currentCompany.foundingDate.substring(0,4));i<=(new Date().getFullYear());i++)
        {
          this.years.push(i);
        }
         this.signupService.getJobsByCompany(this.currentCompany.id).subscribe(
          data1=>
          {
            this.allJobs = data1;
            this.countJobs();
            this.createChart();
        }
        )
        this.signupService.getAllApplicationsViaCompany(this.currentCompany.id).subscribe(
          data=>{
            this.allApplications = data;
             this.countApplications();
             this.createChart();
          }
        )
        this.signupService.getEmployeesByCompany(this.currentCompany.id).subscribe(
          data2=>
          {
            this.allEmployees = data2;
            console.log(data2);
          }
        )
         
      })



    

      
  }

  countApplications()
  {
    this.applicationsArray.fill(0);
    for (const application of this.allApplications) {
      const applyDate = new Date(application.applyDate);
      
      if (applyDate.getFullYear() == this.currentYear) {
              this.applicationsArray[applyDate.getMonth()]++;
      }

  }
  }

  countJobs()
  {
    
    this.myJobArray.fill(0);
    for (const job of this.allJobs) {
      const postDate = new Date(job.postDate);
       if (postDate.getFullYear() == this.currentYear) {
        console.log("from countjobs" + postDate.getFullYear());
              this.myJobArray[postDate.getMonth()]++;
      }
     

  }
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
  
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "Jobs",
            data: [this.myJobArray[0],this.myJobArray[1],this.myJobArray[2],this.myJobArray[3],this.myJobArray[4],this.myJobArray[5],this.myJobArray[6],this.myJobArray[7],this.myJobArray[8],this.myJobArray[9],this.myJobArray[10], this.myJobArray[11]],
            backgroundColor: '#154863', // Use rgba for transparency
            borderColor: 'rgba(25, 38, 85, 1)',
            borderWidth: 1,
            barPercentage: 0.4,
          },
          {
            label: "Applications",
            data: [this.applicationsArray[0],this.applicationsArray[1],this.applicationsArray[2],this.applicationsArray[3],this.applicationsArray[4],this.applicationsArray[5],this.applicationsArray[6],this.applicationsArray[7],this.applicationsArray[8],this.applicationsArray[9],this.applicationsArray[10], this.applicationsArray[11]],
            backgroundColor: 'rgba(25, 192, 192, 0.8)', // Use a different color
            borderColor: 'rgba(25, 192, 192, 1)',
            borderWidth: 1,
            barPercentage: 0.4,
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            stacked: false,
            grid: {
              display: false // Hide x-axis grid lines for a cleaner look
            }
          },
          y: {
            stacked: false,
            beginAtZero: true,
            ticks: {
              stepSize: 5,
            },
            max: 100
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      }
    });
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  onYearChange()
  {
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.countApplications();
    this.countJobs();
    this.createChart();
  }
  

  sidebar()
  {
    this.showSidebar = !this.showSidebar;
  }

  logOut() {
   this.signupService.logOut();
  }
  
}
