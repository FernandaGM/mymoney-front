import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {tap} from "rxjs/operators";

import {UserService} from "../user/user.service";
import {environment} from "../../../environments/environment";
const API = environment.ApiUrl;

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(username: string, password: string) {
    return this.http
      .post(API + "/login", {username, password}, {observe: "response" as "response"})
      .pipe(tap(res => {
        console.log(res.headers);
        const authToken = res.headers.get("x-access-token");
        this.userService.setToken(authToken);
      }));
  }
}
