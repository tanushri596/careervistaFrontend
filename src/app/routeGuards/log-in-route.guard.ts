import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { SignUpService } from '../services/sign-up.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class logInRouteGuard implements CanActivate
 {
  
  constructor(private signUpService : SignUpService, private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean|UrlTree{
   if(this.signUpService.authenticateToken()){
     return true;
   }else{
    return  this.router.parseUrl("/logIn");
     
   }

  }
};
