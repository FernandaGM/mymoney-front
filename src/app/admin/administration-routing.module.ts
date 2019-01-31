import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AuthGuard} from "../core/auth/auth.guard";
import {AdministrationComponent} from "./administration.component";
import {ProfileComponent} from "./profile/profile.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: "profile",
        component: ProfileComponent,
        data: {
          title: "Profile"
        }
      },
      {
        path: "edit-profile",
        component: EditProfileComponent,
        data: {
          title: "Edit Profile"
        }
      },
      {
        path: "reset-password",
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
