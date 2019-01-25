import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

import {HomeComponent} from "./home.component";
import {MainComponent} from "./main/main.component";
import {SigninComponent} from "./signin/signin.component";
import {VmessageModule} from "../shared/component/vmessage/vmessage.module";
import {SignupComponent} from "./signup/signup.component";
import {SignupService} from "./signup/signup.service";

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    VmessageModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    SignupService
  ]
})
export class HomeModule {}
