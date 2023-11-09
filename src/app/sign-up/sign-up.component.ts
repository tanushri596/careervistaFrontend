import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, Company } from '../model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit { 

  receivedOption: any;
  candidate:boolean = false;
  existingMailMsg: string | undefined;
  yearDifference : number = 0;
  candidateEmailArray:string[] = [];
  companyEmailArray:string[]=[];
  companyNameArray:string[]=[];
  companyArray:Company[]=[];
  selectedDesignation!:String;
  

   


  constructor(private signUpService: SignUpService, private router : Router) {}

  ngOnInit() {
    this.signUpService.data$.subscribe((data) => {
      this.receivedOption = data;
      if (this.receivedOption === 'candidate') this.candidate = true;
      else this.candidate = false;
    })


      const getCandidates = this.signUpService.getAllCandidates();

    const observable1 = getCandidates();
    observable1.subscribe((data: Candidate[]) => {

      data.forEach((ele : Candidate)=>
      {
          this.candidateEmailArray.push(ele.username);
         
      })


      const getCompanies = this.signUpService.getAllCompanies();

      const observable2 = getCompanies();
      observable2.subscribe((data: Company[]) => {
        this.companyArray = data;
  
        data.forEach((ele : Company)=>
        {
            this.companyEmailArray.push(ele.username);
            this.companyNameArray.push(ele.name.toUpperCase());
            
        })
      
     
     
    });

      
    });
    }

    companyNameValidator(companyName:string) : boolean
    {
      
        return this.companyNameArray.includes(companyName.toUpperCase());
    }

    birthDateValidator(birthDate : string) : boolean
    {
      const inputDate = new Date(birthDate); 
      const comparisonDate = new Date();    

      this.yearDifference = comparisonDate.getFullYear() - inputDate.getFullYear();


if (comparisonDate.getMonth() < inputDate.getMonth() || 
(comparisonDate.getMonth() === inputDate.getMonth() && 
comparisonDate.getDate() < inputDate.getDate())) 
{
    this.yearDifference--;
}

if(this.yearDifference < 18)
    return false;
 return true;

    }

    passwordValid(password : any) : boolean
    {
      if (password === null || password === undefined) {
        return false;
    }
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{8,100}$/;
  
  if (password.match(regex)) {
    
    return true;
  } else {
    return false;
  }
     
      return true;
    }

    candidateMailValidator(email:string):boolean
    {
      return this.candidateEmailArray.includes(email);
      
    }

    companyMailValidator(email:string):boolean
    {
       return this.companyEmailArray.includes(email);  
    }

    phoneNumberValidator(phoneNumber:string) : boolean
    {
      const regex = /^\d{10}$/;

  
      if (phoneNumber.match(regex)) {
        
        return true;
      } else {
        return false;
      }
         
          return true;
    }

    candidateNameValidator(name:string)
    {
      const trimmedString = name.trim();
  
      
      if (trimmedString.includes(' ')) {
        return false;
      }
    
      if (/\d/.test(trimmedString)) {
        return false;
      }
    
      return true;
    }

    
   

   

  onCandidateSubmit(data: Candidate)
   { 
    
    console.log(data);
    
    const {confirmPassword,...candidateData} = data;
    candidateData.role = 'candidate';
    candidateData.firstName = data.firstName.trim();
    candidateData.lastName = data.lastName.trim();

    if(this.selectedDesignation === 'student')
    {
      // candidateData.company = null;
    }
  else
    candidateData.company = data.company;
  

   
    
    
    this.signUpService.addCandidate(candidateData).subscribe({
      next:(val) => {
        console.log(val);
        this.router.navigate(['/logIn']);
      },
      error:(err:HttpErrorResponse)=>{
        this.existingMailMsg=err.error.message;
      }
    });
    }

    onCompanySubmit(data : Company)
    {
      const {confirmPassword,...companyData} = data;
      companyData.role = 'company';
     
  
      console.warn("company data",companyData);
      
      this.signUpService.addCompany(companyData).subscribe({
        next:(val) => {
          console.log(val);
          this.router.navigate(['/logIn']);
        },
        error:(err:HttpErrorResponse)=>{
          this.existingMailMsg=err.error.message;
        }
      });
    }
}
