import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  user: User = null;
  userId: string = localStorage.getItem("user").toString();

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.getUser();
    this.dataService.getJobs();
    this.dataService.getComments();
    this.dataService.getStations();
    this.dataService.getUserJobs(parseInt(this.userId));
  }

  getUser(){
    this.http.get<User>('api/users/' + this.userId + "/").subscribe(result => {
      // console.log(result);
      this.user = result;
    })
  }

}
