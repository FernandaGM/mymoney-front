import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AdministrationComponent} from "./administration.component";
import {AuthGuard} from "../core/auth/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "edit-profile",
        component: ProfileComponent,
        data: {
          title: "Profile"
        }
      },
      {
        path: "password-reset",
        component: ResetPasswordComponent,
        data: {
          title: "Reset password"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
