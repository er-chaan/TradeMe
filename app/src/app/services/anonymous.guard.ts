import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private userService: UserService, private router:Router, private location: Location) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    if(!this.userService.isUserLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/user']);
      // this.router.navigate([this.location.back()]);
      return false;
    }
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
