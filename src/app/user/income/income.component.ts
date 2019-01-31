import {Component, OnDestroy, OnInit} from "@angular/core";
import {Entry} from "../entry/entry";
import {Observable} from "rxjs";
import {Category} from "../category/category";
import {IncomeService} from "../income/income.service";
import {UserService} from "../../core/user/user.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DateService} from "../date.service";

@Component({
  templateUrl: "./income.component.html",
  providers: [
    IncomeService
  ]
})
export class IncomeComponent implements OnInit, OnDestroy {
  incomes: Entry[];
  filter = "";
  page: number;
  month: Date;
  total$: Observable<number>;
  categories: Category[];
  subscription;

  constructor(
    private incomeService: IncomeService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private dateService: DateService) {
  }

  ngOnInit(): void {
    this.page = 0;

    this.subscription = this.dateService.getMonth().subscribe(month => {
      this.month = month;
      this.total$ = this.incomeService.getTotalMonthIncomes(this.userService.getUserName(), this.month);
      this.fetchIncomes();
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  paginate(event) {
    this.page = event.page;
    this.fetchIncomes();
  }

  fetchIncomes() {
    this.incomeService.getMonthIncomesPaginated(this.userService.getUserName(), this.month, this.page)
      .subscribe(incomes => {
        this.incomes = incomes;
      });
  }

  editEntry(income) {
    this.router.navigate(["/user/edit-entry", income.id]);
  }

  removeIncome(income) {

    this.incomeService.removeIncome(income.id).subscribe(
      ok => {
        ok ? this.messageService.add({severity: "success", summary: "OK", detail: "Removida com sucesso"}) :
          this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel remover a despesa"});
        this.fetchIncomes();
      },
      error => {
        console.log(error);
        this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel remover a despesa"});
      }
    );

  }
}
