import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserViewComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
  }

  // getUser(){

  // }

}
