import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {UserService} from "../../core/user/user.service";
import {UserData} from "./user-data";

@Component({
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {

  userData$: Observable<UserData>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userData$ = this.userService.getUserData();
  }
}
