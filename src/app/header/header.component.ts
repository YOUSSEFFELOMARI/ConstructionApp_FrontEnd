import {Component} from '@angular/core';
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // isAuthenticated!: boolean;
  constructor(public authService:AuthService, private router:Router) {
  }

  handleLogout() {
    this.authService.logout();
  }
}
