import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit
 {
  constructor(private signupService:SignUpService){}
  ngOnInit()
  {
    setInterval(()=>
    {
      if(!this.signupService.authenticateToken())
      this.signupService.logOut();

    },5000);
      
  }

  logOut() {
   this.signupService.logOut();
  }
  
}
