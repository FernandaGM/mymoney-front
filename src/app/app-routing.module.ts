import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MainComponent} from "./home/main/main.component";
import {SigninComponent} from "./home/signin/signin.component";
import {SignupComponent} from "./home/signup/signup.component";
import {LoginGuard} from "./core/auth/login.guard";
import {NotFoundComponent} from "./errors/not-found/not-found.component";
import {AuthGuard} from "./core/auth/auth.guard";

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
    loadChildren: "./admin/administration.module#AdministrationModule",
    canActivate: [AuthGuard]
  },
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule",
    canActivate: [AuthGuard]
  },
  {
    path: "not-found",
    component: NotFoundComponent,
    data: {
      title: "Not found"
    }
  },
  {
    path: "**",
    redirectTo: "not-found"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
