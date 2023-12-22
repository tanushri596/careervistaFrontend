

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private signUpService: SignUpService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.signUpService.authenticateToken()) {
      const role = localStorage.getItem('role');

      if (role === 'company') {
        return  this.router.parseUrl('/companyHome');
      } else if (role === 'candidate') {
           return  this.router.parseUrl('/candidateHome'); }
    }

      return this.router.parseUrl('/logIn');
  }
}

