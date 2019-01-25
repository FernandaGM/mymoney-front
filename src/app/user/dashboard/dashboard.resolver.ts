import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {DashboardService} from "./dashboard.service";
import {UserService} from "../../core/user/user.service";

@Injectable({ providedIn: "root" })
export class DashboardResolver implements Resolve<Observable<any>> {

  constructor(private service: DashboardService,
              private userService: UserService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userName = this.userService.getUserName();
    return this.service.getDados(userName);
  }

}
