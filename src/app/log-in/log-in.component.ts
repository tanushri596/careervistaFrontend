import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';
import { logIn } from '../model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent 
{
  
  constructor(private router: Router,private signUpService: SignUpService) {}

  
 

  onSubmit(form:NgForm)
  {
    console.log(form);
  }

 
  

  

  onSelected(event:Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    if (selectedValue === 'company') {
      this.router.navigate(['/signUp']); 
      this.signUpService.sendData(selectedValue);
      
    } else if (selectedValue === 'candidate') {
      this.router.navigate(['/signUp']); 
      this.signUpService.sendData(selectedValue);
     
    }
    }

    onLogin(formValue : logIn)
    {
      console.warn(formValue);

    this.signUpService.authenticateUser(formValue).subscribe((val: any) => {
      localStorage.setItem('token', val.token);
      localStorage.setItem('role', val.role);
      localStorage.setItem('username',formValue.username);

      console.log(localStorage.getItem('role'));
     
      if (localStorage.getItem('role') == 'candidate') {
        this.router.navigate(['/candidateHome']);
      }
      else
      {
        this.router.navigate(['/companyHome']);
      }
      
      
    },(error)=>{
      alert("Invalid credentials")
    }
    );
    }



}
