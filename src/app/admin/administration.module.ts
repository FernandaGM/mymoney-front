import {NgModule} from "@angular/core";
import {AdministrationComponent} from "./administration.component";
import {CommonModule} from "@angular/common";
import {AdministrationRoutingModule} from "./administration-routing.module";
import {ProfileComponent} from "./profile/profile.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

@NgModule({
  declarations: [
    AdministrationComponent,
    ProfileComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule {}
