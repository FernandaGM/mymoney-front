import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ButtonModule, MenubarModule, MenuModule, SplitButtonModule} from "primeng/primeng";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {HeaderComponent} from "./header/header.component";
import {RequestInterceptor} from "./auth/request.interceptor";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    RouterModule,
    MenubarModule,
    ButtonModule,
    SplitButtonModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }
]
})
export class CoreModule {}
