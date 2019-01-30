import {Component, OnDestroy, OnInit} from "@angular/core";
import {ExpenseService} from "./expense.service";
import {Entry} from "../entry/entry";
import {Observable} from "rxjs";
import {UserService} from "../../core/user/user.service";
import {DateService} from "../date.service";
import {Category} from "../category/category";

@Component({
  templateUrl: "./expense.component.html",
  providers: [
    ExpenseService
  ]
})
export class ExpenseComponent implements OnInit, OnDestroy {

  expenses$: Observable<Entry[]>;
  filter = "";
  page: number;
  month: Date;
  total$: Observable<number>;
  categories: Category[];
  subscription;

  constructor(
    private expenseService: ExpenseService,
    private userService: UserService,
    private dateService: DateService) {
  }

  ngOnInit(): void {
    this.page = 0;

    this.subscription = this.dateService.getMonth().subscribe(month => {
      this.month = month;
      this.total$ = this.expenseService.getTotalMonthExpenses(this.userService.getUserName(), this.month);
      this.fetchExpenses();
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  paginate(event) {
    this.page = event.page;
    this.fetchExpenses();
  }

  fetchExpenses() {
    this.expenses$ = this.expenseService.getMonthExpensesPaginated(this.userService.getUserName(), this.month, this.page);
  }


}
