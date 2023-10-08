import {Component, } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  formLogin !: FormGroup;
  constructor(private fb:FormBuilder, private authService:AuthService,
              private router: Router) {
  }

  ngOnInit(){
    this.formLogin= this.fb.group({
      email : this.fb.control(""),
      password : this.fb.control(""),
    })
  }

  handleLogin() {
    let email = this.formLogin.value.email;
    let pwd = this.formLogin.value.password;
    this.authService.login(email,pwd).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin/employee")
      },
      error:err => {
        console.log(err)
      }
    })
  }
}
