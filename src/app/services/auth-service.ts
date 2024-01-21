import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean =false;
  username:any;
  accessToken !: any;

  constructor(private http:HttpClient, private router:Router) { }

  public login(email:string, password:string){
    let options={ headers : new HttpHeaders().set("Content-Type","application/json") };
    let body = {
      email: email,
      password: password,
    };
    return  this.http.post("https://constructionapp-5wbh.onrender.com/auth/login",body,options)
  }

  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accessToken= data['token'];
    let decodedJwt :any= jwtDecode(this.accessToken);
    this.username= decodedJwt.sub;
    window.localStorage.setItem("token",this.accessToken);
  }

  logout() {
    this.isAuthenticated=false;
    this.username=undefined;
    this.accessToken=undefined;
    window.localStorage.removeItem("token")
    this.router.navigateByUrl("/home")
  }

  loadJwtToken() {
    let token = window.localStorage.getItem("token");
    if (token){
      this.loadProfile({"token" : token});
      this.router.navigateByUrl("/admin/employee")
    }
  }
}
