import {Injectable} from "@angular/core";
import {TokenService} from "../token/token.service";
import {BehaviorSubject} from "rxjs";
import {User} from "./user";
import * as jwt_decode from "node_modules/jwt-decode";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {UserData} from "../../admin/profile/user-data";
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
    const data = jwt_decode(token);
    this.userName = data.sub;
    this.http.get(`${API}/user/getuser/${data.sub}`)
      .subscribe((user: User) => {
        console.log(user);
        if (!user) {
          this.userName = "";
          this.tokenService.removeToken();
        }
        this.userSubject.next(user);
      }, error => {
        console.log(error);
      });

  }

  getUserData() {
    return this.http.get<UserData>(`${API}/user/getuserdata/${this.userName}`);
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    console.log(this.userName);
    return this.userName && this.userName !== "";
  }

  getUserName() {
    return this.userName;
  }

  updateUser(user) {
    return this.http.put(`${API}/user/update/${this.userName}`, user);
  }
}
