import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

import {UserService} from "../user/user.service";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivateChild, CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

    if (!this.userService.isLogged()) {
      return this.router.createUrlTree(["/"]);
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isLogged()) {
      return this.router.createUrlTree(["/"]);
    }
    return true;
  }
}
