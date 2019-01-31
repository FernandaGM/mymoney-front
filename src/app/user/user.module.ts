import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {
  AutoCompleteModule,
  CalendarModule,
  CarouselModule,
  InputTextModule, KeyFilterModule,
  MultiSelectModule,
  PaginatorModule,
  PanelModule, RadioButtonModule
} from "primeng/primeng";
import {TableModule} from "primeng/table";

import {UserComponent} from "./user.component";
import {ExpenseComponent} from "./expense/expense.component";
import {IncomeComponent} from "./income/income.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserRoutingModule} from "./user-routing.module";
import {DashboardService} from "./dashboard/dashboard.service";
import {VmessageModule} from "../shared/component/vmessage/vmessage.module";
import {DateService} from "./date.service";
import {NewEntryComponent} from "./entry/new-entry.component";
import {EditEntryComponent} from "./entry/edit-entry.component";
import {FilterByDescription} from "./filter-by-description.pipe";
import {EntryService} from "./entry/entry.service";
import {ExpenseService} from "./expense/expense.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "./category/category.service";
import {SearchModule} from "../shared/component/search/search.module";
import {EditEntryResolver} from "./entry/edit-entry.resolver";

@NgModule({
  declarations: [
    UserComponent,
    ExpenseComponent,
    IncomeComponent,
    DashboardComponent,
    NewEntryComponent,
    EditEntryComponent,
    FilterByDescription
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SearchModule,
    VmessageModule,
    ChartModule,
    CardModule,
    CarouselModule,
    AutoCompleteModule,
    TableModule,
    PaginatorModule,
    CalendarModule,
    MultiSelectModule,
    InputTextModule,
    PanelModule,
    RadioButtonModule,
    KeyFilterModule
  ],
  providers: [
    DashboardService,
    EditEntryResolver,
    CategoryService,
    DateService,
    EntryService,
    ExpenseService
  ]
})
export class UserModule {}
