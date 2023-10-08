import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {authGuard} from "./auth.guard";
import {EmployeesComponent} from "./employees/employees.component";
import {ConstructionSitesComponent} from "./construction-sites/construction-sites.component";
import {MonthsComponent} from "./months/months.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:"full"},
  {path: 'login' ,component: LoginPageComponent},
  {path:'admin', component: AdminDashboardComponent, canActivate: [authGuard], children :[
      {path: 'employee' ,component: EmployeesComponent},
      {path: 'constructionSite' ,component: ConstructionSitesComponent},
      {path: 'months' ,component: MonthsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
