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
import { MonthsComponent } from './employees/months/months.component';
import { ConstructionSitesComponent } from './construction-sites/construction-sites.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { SaveEmplyeeModalComponent } from './employees/save-emplyee-modal/save-emplyee-modal.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import { UpdateEmplyeeComponent } from './employees/update-emplyee/update-emplyee.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { UpdateMonthComponent } from './employees/update-month/update-month.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DeleteComponent } from './employees/delete/delete.component';
import { DeleteComponentCS } from './construction-sites/delete/delete.component';
import { UpdateCsiteComponent } from './construction-sites/update-csite/update-csite.component';
import { DeleteCSNameComponent } from './construction-sites/delete-csname/delete-csname.component';
import { UpdateCSNameComponent } from './construction-sites/update-csname/update-csname.component';
import { SaveCSNameComponent } from './construction-sites/save-csname/save-csname.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContatcFormComponent } from './contatc-form/contatc-form.component';
import {NgOptimizedImage} from "@angular/common";






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
    ConstructionSitesComponent,
    SaveEmplyeeModalComponent,
    UpdateEmplyeeComponent,
    UpdateMonthComponent,
    DeleteComponent,
    DeleteComponentCS,
    UpdateCsiteComponent,
    DeleteCSNameComponent,
    UpdateCSNameComponent,
    SaveCSNameComponent,
    HomePageComponent,
    ContatcFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgOptimizedImage

  ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
