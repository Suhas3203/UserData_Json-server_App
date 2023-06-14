import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserServService } from '../user-serv.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userSerice.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
    // if(!this.userSerice.isLoggedIn()){
    //  return this.router.navigate(['login']);
    // }
    // return this.router.navigate(['dashboard']);
  }

  constructor(private router: Router, private userSerice: UserServService) {}
}
