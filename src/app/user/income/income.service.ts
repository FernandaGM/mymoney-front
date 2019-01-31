import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Entry} from "../entry/entry";

const API = environment.ApiUrl;

@Injectable()
export class IncomeService {

  constructor(private http: HttpClient) {}

  public getMonthIncomesPaginated(username, date, page): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${API}/entry/income/getbyusername/${username}/${date.getMonth()}/${date.getFullYear()}/${page}`);
  }

  public getTotalMonthIncomes(username, date): Observable<number> {
    return this.http.get<number>(`${API}/entry/income/gettotalbyusername/${username}/${date.getMonth()}/${date.getFullYear()}`);
  }

  public removeIncome(incomeId): Observable<boolean> {
    return this.http.delete<boolean>(`${API}/entry/remove/${incomeId}`);
  }
}
