import {Component, OnDestroy, OnInit} from "@angular/core";
import {ExpenseService} from "./expense.service";
import {Entry} from "../entry/entry";
import {Observable} from "rxjs";
import {UserService} from "../../core/user/user.service";
import {DateService} from "../date.service";
import {Category} from "../category/category";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  templateUrl: "./expense.component.html",
  providers: [
    ExpenseService
  ]
})
export class ExpenseComponent implements OnInit, OnDestroy {

  expenses: Entry[];
  filter = "";
  page: number;
  month: Date;
  total$: Observable<number>;
  categories: Category[];
  subscription;

  constructor(
    private expenseService: ExpenseService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
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
    this.expenseService.getMonthExpensesPaginated(this.userService.getUserName(), this.month, this.page)
      .subscribe(expenses => {
        this.expenses = expenses;
      });
  }

  editEntry(expense) {
    this.router.navigate(["/user/edit-entry", expense.id]);
  }

  removeExpense(expense) {

    this.expenseService.removeExpense(expense.id).subscribe(
      ok => {
         ok ? this.messageService.add({severity: "success", summary: "OK", detail: "Removida com sucesso"}) :
        this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel remover a despesa"});
         this.fetchExpenses();
      }
        ,
      error => {
        console.log(error);
        this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel remover a despesa"});
      }
    );

  }
}
