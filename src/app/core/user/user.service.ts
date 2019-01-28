import {Injectable} from "@angular/core";
import {TokenService} from "../token/token.service";
import {BehaviorSubject} from "rxjs";
import {User} from "./user";
import * as jwt_decode from "node_modules/jwt-decode";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {myResponse} from "./myresponse";
const API = environment.ApiUrl;

@Injectable({providedIn: "root"})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {
    if (tokenService.hasToken()) { this.decodeAndNotify(); }
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token);
    this.userName = user.sub;
    this.http.get(API + "/user/getuser/" + user.sub)
      .subscribe((resp: myResponse) => {
        if (resp.status === 200) {
          this.userSubject.next(resp.body[0] as User);
        } else {
          this.userSubject.next(null);
        }
      });

  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }
}
