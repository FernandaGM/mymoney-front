import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDados(username) {
    return this.http.get(API + "/users/dashboards/" + username);
  }
}
