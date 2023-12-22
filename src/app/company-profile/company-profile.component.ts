import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Company, CompanyDto } from '../model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit 
{
  currentCompany !: CompanyDto ;
  username: any = localStorage.getItem('username');
  constructor(private signUpService:SignUpService){}

  ngOnInit()
  {
     this.signUpService.getCurrentCompany(this.username).subscribe(
      data=>{
        this.currentCompany = data;
      }
     )  
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
saveChanges()
{

}
  logOut()
  {
    this.signUpService.logOut();
  }
}
