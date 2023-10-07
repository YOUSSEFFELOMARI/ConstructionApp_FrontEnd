import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {authGuard} from "./auth.guard";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:"full"},
  {path: 'login' ,component: LoginPageComponent},
  {path:'admin', component: AdminDashboardComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
