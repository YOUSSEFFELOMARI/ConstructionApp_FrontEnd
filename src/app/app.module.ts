import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { SideBarComponent } from './side-bar/side-bar.component';
import { EmployeesComponent } from './employees/employees.component';
import { MonthsComponent } from './months/months.component';
import { ConstructionSitesComponent } from './construction-sites/construction-sites.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    LoginPageComponent,
    FooterComponent,
    AdminDashboardComponent,
    SideBarComponent,
    EmployeesComponent,
    MonthsComponent,
    ConstructionSitesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
