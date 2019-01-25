import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MainComponent} from "./home/main/main.component";
import {SigninComponent} from "./home/signin/signin.component";
import {SignupComponent} from "./home/signup/signup.component";
import {LoginGuard} from "./core/auth/login.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: "",
        component: MainComponent,
        data: {
          title: "myMoney"
        }
      },
      {
        path: "signin",
        component: SigninComponent,
        data: {
          title: "Sign in"
        }
      },
      {
        path: "signup",
        component: SignupComponent,
        data: {
          title: "Sign up"
        }
      }
    ]
  },
  {
    path: "admin",
    loadChildren: "./admin/administration.module#AdministrationModule"
  },
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
