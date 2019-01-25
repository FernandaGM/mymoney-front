import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";
// import {ActivatedRoute, Router} from "@angular/router";
// import {PlataformDetectorService} from "../../core/plataform-detector/plataform-detector.service";

@Component({
  templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {

  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild("userNameInput") userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    // private plataformDetectorService: PlataformDetectorService,
    // private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activateRoute.queryParams.subscribe(params => this.fromUrl = params.fromUrl);
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
    // this.plataformDetectorService.isPlataformBrowser() && this.userNameInput.nativeElement.focus();
  }

  login() {

    const userName = this.loginForm.get("userName").value;
    const password = this.loginForm.get("password").value;

    this.authService.authenticate(userName, password)
      .subscribe(
        () => this.fromUrl
          ? this.router.navigateByUrl(this.fromUrl)
          : this.router.navigate(["/user/dashboards"]) ,
        error => {
          console.log(error.message);
          // this.plataformDetectorService.isPlataformBrowser() && this.userNameInput.nativeElement.focus();
          this.loginForm.reset();
        }
      );
  }
}
