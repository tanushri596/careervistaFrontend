import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, Company } from '../model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userEmailValidationPerformed = false;
  companyEmailValidationPerformed = false;
  receivedOption: any;
  candidate: boolean = true;
  existingMailMsg: string | undefined;
  yearDifference: number = 0;
  companyNameArray: string[] = [];
  companyArray: Company[] = [];
  selectedDesignation!: String;
  existingCandidate:boolean = false; // to check if the candidate email is already present or not
  existingCompany:boolean = false; 
  currentpage:number = 1;
  username!:string;

  
  
  constructor(private signUpService: SignUpService, private router: Router) {}

  ngOnInit() {

   
    this.signUpService.data$.subscribe((data) => {
      this.receivedOption = data;
      
      if (this.receivedOption == 'candidate') this.candidate = true;
      else if(this.receivedOption == 'company') this.candidate = false;

     
    });

   
      const getCompanies = this.signUpService.getAllCompanies();

      const observable2 = getCompanies();
      observable2.subscribe((data: Company[]) => {
        this.companyArray = data;

        data.forEach((ele: Company) => {
        
          this.companyNameArray.push(ele.name.toUpperCase());
        });
      });
    
  }

  nextClicked()
  {
    this.currentpage +=1;
  }

  companyNameValidator(companyName: string): boolean {
    return this.companyNameArray.includes(companyName.toUpperCase());
  }

  birthDateValidator(birthDate: string): boolean {
    const inputDate = new Date(birthDate);
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

    if (this.yearDifference < 18) return false;
    return true;
  }

  passwordValid(password: any): boolean {
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

  candidateMailValidator(email: string): boolean {
    
    if (!this.userEmailValidationPerformed) {
      this.signUpService.getCandidate(email).subscribe((data) => {
        this.existingCandidate = data;
        this.userEmailValidationPerformed = true;
      });
    }
  
    return this.existingCandidate;
  }
  

  companyMailValidator(email: string): boolean {
    
    if (!this.companyEmailValidationPerformed) {
      this.signUpService.getCompany(email).subscribe((data) => {
        this.existingCompany = data;
        this.companyEmailValidationPerformed = true;
      });
    }
  
    return this.existingCompany;
  }

  phoneNumberValidator(phoneNumber: string): boolean {
    const regex = /^\d{10}$/;

    if (phoneNumber.match(regex)) {
      return true;
    } else {
      return false;
    }

    return true;
  }

  candidateNameValidator(name: string) {
    const trimmedString = name.trim();

    if (trimmedString.includes(' ')) {
      return false;
    }

    if (/\d/.test(trimmedString)) {
      return false;
    }

    return true;
  }

  onCandidateSubmit(data: Candidate) {
    console.log(data);

    const { confirmPassword, ...candidateData } = data;
    candidateData.role = 'candidate';
    candidateData.firstName = data.firstName.trim();
    candidateData.lastName = data.lastName.trim();

    if (this.selectedDesignation === 'student') {
      // candidateData.company = null;
    } else 
    {
      candidateData.company = data.company;
      candidateData.status = "Employee";
    }

    console.log()

    this.signUpService.addCandidate(candidateData).subscribe({
      next: (val) => {
        console.log(val);
        this.router.navigate(['/logIn']);
      },
      error: (err: HttpErrorResponse) => {
        this.existingMailMsg = err.error.message;
      },
    });
  }

  onCompanySubmit(data: Company) {
    const { confirmPassword, ...companyData } = data;
    companyData.role = 'company';

    console.warn('company data', companyData);

    this.signUpService.addCompany(companyData).subscribe({
      next: (val) => {
        console.log(val);
        this.router.navigate(['/logIn']);
      },
      error: (err: HttpErrorResponse) => {
        this.existingMailMsg = err.error.message;
      },
    });
  }
}
