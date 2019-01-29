import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";

const API = environment.ApiUrl;

@Injectable()
export class AdministrationService {

  constructor( private http: HttpClient) {}

  resetPassword(username, password) {

    return this.http.put(`${API}/user/reset-password/${username}`, password);
  }
}
