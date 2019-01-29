import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import ptBr from "@angular/common/locales/pt";

import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import {CoreModule} from "./core/core.module";
import {ErrorsModule} from "./errors/errors.module";
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ErrorsModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    ToastModule,
    RouterModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
