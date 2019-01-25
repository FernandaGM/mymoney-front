import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AuthGuard} from "../core/auth/auth.guard";
import {UserComponent} from "./user.component";
import {ExpenseComponent} from "./expense/expense.component";
import {IncomeComponent} from "./income/income.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardResolver} from "./dashboard/dashboard.resolver";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "expense",
        component: ExpenseComponent,
        data: {
          title: "Profile"
        }
      },
      {
        path: "income",
        component: IncomeComponent,
        data: {
          title: "Reset password"
        }
      },
      {
        path: "dashboards",
        component: DashboardComponent,
        resolve: {
          dados: DashboardResolver
        },
        data: {
          title: "Dashboard"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
