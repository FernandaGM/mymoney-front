import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDados(username: string, date: Date) {
    return this.http.get(`${API}/user/dashboards/${username}/${date.getMonth()}/${date.getFullYear()}`);
  }
}
