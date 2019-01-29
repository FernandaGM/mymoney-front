import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import {AdministrationComponent} from "./administration.component";
import {AdministrationRoutingModule} from "./administration-routing.module";
import {ProfileComponent} from "./profile/profile.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {AdministrationService} from "./administration.service";
import {VmessageModule} from "../shared/component/vmessage/vmessage.module";

import {ButtonModule, CardModule, FieldsetModule, PanelModule, TabMenuModule} from "primeng/primeng";

@NgModule({
  declarations: [
    AdministrationComponent,
    ProfileComponent,
    EditProfileComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
    TabMenuModule,
    PanelModule,
    VmessageModule,
    ButtonModule,
    CardModule,
    FieldsetModule
  ],
  providers: [
    AdministrationService
  ]
})
export class AdministrationModule {}
