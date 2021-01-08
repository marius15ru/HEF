import { Component } from '@angular/core';
import { Role } from '../shared/enums';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  role = localStorage.getItem("role");

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
