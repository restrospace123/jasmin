import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRoute, ParamMap,  NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if(localStorage.getItem('currentUser') === 'undefined'){
      return false;
    }else if(localStorage.getItem('currentUser')){ 
      return true;
    }

    this.router.navigate(['']);
    
  }
}
