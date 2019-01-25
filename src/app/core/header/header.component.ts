import {Component, OnInit} from "@angular/core";
import {MenuItem} from "primeng/api";
import {Observable} from "rxjs";
import {User} from "../user/user";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: "fp-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {

  itens: MenuItem[];
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private router: Router) {
    this.user$ = userService.getUser();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      if (user) {
        this.itens = [
          {
            label: "Dashboards",
            icon: "fa fa-chart-pie",
            routerLink: ["/user/dashboards"]
          },
          {
            label: "Incomes",
            routerLink: ["/user/income"]
          },
          {
            label: "Expenses",
            routerLink: ["/user/expense"]
          },
          {
            label: "Administration",
            items: [
              {label: "Edit Profile", icon: "fa fa-user-edit", routerLink: ["/admin/edit-profile"]},
              {label: "Reset password", icon: "fa fa-key", routerLink: ["/admin/password-reset"]}
            ]
          }];
      } else {
        this.itens = [
          {
            label: "Home",
            routerLink: [""]
          }
        ];
      }
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate([""]);
  }
}
