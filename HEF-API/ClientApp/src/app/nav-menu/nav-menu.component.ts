import { Component } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { Role } from '../shared/enums';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(public authGuard: AuthGuardService) {}

  isExpanded = false;
  role: Role = parseInt(localStorage.getItem("role"));

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }



  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    console.log(localStorage.getItem("jwt"));
 }
}
