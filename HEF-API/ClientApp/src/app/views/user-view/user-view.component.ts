import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserViewComponent implements OnInit {

  user: User = null;
  userId: string = localStorage.getItem("user").toString();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.http.get<User>('api/users/' + this.userId + "/").subscribe(result => {
      console.log(result);
      this.user = result;
    })
  }

}
