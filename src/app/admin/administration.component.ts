import { Component, OnInit } from "@angular/core";

import {UserService} from "../core/user/user.service";
import {User} from "../core/user/user";

@Component({
  templateUrl: "./administration.component.html",
})
export class AdministrationComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user );
  }

}
