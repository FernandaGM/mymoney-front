import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AuthGuard} from "../core/auth/auth.guard";
import {UserComponent} from "./user.component";
import {ExpenseComponent} from "./expense/expense.component";
import {IncomeComponent} from "./income/income.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardResolver} from "./dashboard/dashboard.resolver";
import {NewEntryComponent} from "./entry/new-entry.component";
import {EditEntryComponent} from "./entry/edit-entry.component";
import {EditEntryResolver} from "./entry/edit-entry.resolver";

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
      },
      {
        path: "new-entry",
        component: NewEntryComponent,
        data: {
          title: "New Entry"
        }
      },
      {
        path: "edit-entry/:id",
        component: EditEntryComponent,
        resolve: {
          entry: EditEntryResolver
        },
        data: {
          title: "Edit Entry"
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
