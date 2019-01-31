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
  adminItens: MenuItem[];
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
            label: "Receitas",
            routerLink: ["/user/income"]
          },
          {
            label: "Despesas",
            routerLink: ["/user/expense"]
          }];
        this.adminItens = [
          {
            label: "Redefinir senha",
            icon: "fa fa-key",
            routerLink: ["/admin/reset-password"]
          },
          {
            label: "Editar perfil",
            routerLink: ["/admin/edit-profile"]
          },
          {
            label: "Sair",
            icon: "fa fa-sign-out",
            command: () => {
              console.log("Entrei");
              this.userService.logout();
              this.router.navigate(["/"]);
            }
          }
        ];
      } else {
        this.itens = [
          {
            label: "Home",
            routerLink: [""]
          }
        ];
        this.adminItens = [];
      }
    }, error => {
      console.log(error);
    });
  }
}
