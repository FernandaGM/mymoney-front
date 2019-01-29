import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {differentPasswords} from "./password.validator";
import {UserService} from "../../core/user/user.service";
import {AdministrationService} from "../administration.service";
import {MessageService} from "primeng/api";

@Component({
  templateUrl: "./reset-password.component.html"
})
export class ResetPasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private adminService: AdministrationService) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ["",
        [
          Validators.required
        ]
      ],
      passwordConfirmation: ["",
        [
          Validators.required
        ]
      ]
    }, {
      validators: [
        differentPasswords
      ]
    });
  }

  saveNewPassword() {

    const password = this.passwordForm.get("password").value;
    const username = this.userService.getUserName();

    this.adminService.resetPassword(username, password)
      .subscribe(ok => {
        if (ok) {
          this.passwordForm.reset();
          this.messageService.add({severity: "success", summary: "OK", detail: "Senha atualizada com sucesso"});
        }
      }, error => {
        console.log(error);
        this.messageService.add({severity: "error", summary: "Ops!", detail: "Não foi possivel atualizar a senha"});
      });
  }
}
