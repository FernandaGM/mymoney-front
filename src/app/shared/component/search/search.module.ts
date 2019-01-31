import {NgModule} from "@angular/core";
import {SearchComponent} from "./search.component";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/primeng";

@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  imports: [
    CommonModule,
    InputTextModule
  ]
})
export class SearchModule {
}
