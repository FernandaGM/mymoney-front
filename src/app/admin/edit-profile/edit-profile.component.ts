import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../core/user/user.service";
import {User} from "../../core/user/user";
import {MessageService} from "primeng/api";

@Component({
  templateUrl: "./edit-profile.component.html"
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      user => {
        console.log(user);
        this.editForm = this.formBuilder.group({
          email: [user.email,
            [
              Validators.required,
              Validators.email
            ]
          ],
          firstName: [user.firstName,
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(40)
            ]
          ],
          lastName: [user.lastName,
            [
              Validators.minLength(2),
              Validators.maxLength(40)
            ]
          ],
          phone: [user.phone,
            [
              Validators.minLength(10),
              Validators.pattern(/^[0-9]+/)
            ]
          ]
        });
      }
    );
  }

  atualizar() {
    const user = this.editForm.getRawValue() as User;
    this.userService.updateUser(user)
      .subscribe(
        ok => {
          if (ok) {
            this.messageService.add({severity: "success", summary: "OK", detail: "Usuário atualizado com sucesso"});
          } else {
            this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel atualizar o usuário"});
          }
          this.userService.decodeAndNotify();
        },
        error => {
          console.log(error);
          this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel atualizar o usuário"});
        });
  }
}
