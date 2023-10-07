import {Component} from '@angular/core';
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated!: boolean;
  constructor(private authService:AuthService, private router:Router) {
    this.isAuthenticated=authService.isAuthenticated;
  }

  handleLogout() {
    this.authService.logout();
  }
}
