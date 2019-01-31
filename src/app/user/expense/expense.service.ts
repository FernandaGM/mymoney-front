import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Entry} from "../entry/entry";

const API = environment.ApiUrl;

@Injectable()
export class ExpenseService {

  constructor(private http: HttpClient) {}

  public getMonthExpensesPaginated(username, date, page): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${API}/entry/expense/getbyusername/${username}/${date.getMonth()}/${date.getFullYear()}/${page}`);
  }

  public getTotalMonthExpenses(username, date): Observable<number> {
    return this.http.get<number>(`${API}/entry/expense/gettotalbyusername/${username}/${date.getMonth()}/${date.getFullYear()}`);
  }

  public removeExpense(expenseId): Observable<boolean> {
    return this.http.delete<boolean>(`${API}/entry/remove/${expenseId}`);
  }
}
