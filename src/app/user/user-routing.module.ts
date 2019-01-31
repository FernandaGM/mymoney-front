import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AuthGuard} from "../core/auth/auth.guard";
import {UserComponent} from "./user.component";
import {ExpenseComponent} from "./expense/expense.component";
import {IncomeComponent} from "./income/income.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NewEntryComponent} from "./entry/new-entry.component";
import {EditEntryComponent} from "./entry/edit-entry.component";
import {EditEntryResolver} from "./entry/edit-entry.resolver";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: "expense",
        component: ExpenseComponent,
        data: {
          title: "Despesas"
        }
      },
      {
        path: "income",
        component: IncomeComponent,
        data: {
          title: "Receitas"
        }
      },
      {
        path: "dashboards",
        component: DashboardComponent,
        data: {
          title: "Dashboard"
        }
      },
      {
        path: "new-entry",
        component: NewEntryComponent,
        data: {
          title: "Novo lançamento"
        }
      },
      {
        path: "edit-entry/:id",
        component: EditEntryComponent,
        resolve: {
          entry: EditEntryResolver
        },
        data: {
          title: "Editar lançamento"
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
