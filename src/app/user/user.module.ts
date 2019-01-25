import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {CarouselModule} from "primeng/primeng";

import {UserComponent} from "./user.component";
import {ExpenseComponent} from "./expense/expense.component";
import {IncomeComponent} from "./income/income.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserRoutingModule} from "./user-routing.module";

@NgModule({
  declarations: [
    UserComponent,
    ExpenseComponent,
    IncomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ChartModule,
    CardModule,
    CarouselModule
  ]
})
export class UserModule {}
