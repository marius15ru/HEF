import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  user$: Observable<User> = this.dataService.user$;


  user: User = null;
  userId: string = localStorage.getItem("user");

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCurrentUser(this.userId);
    this.dataService.getJobs();
    this.dataService.getStations();
    this.dataService.getComments();
    this.dataService.getEquipments();
    this.dataService.getAreas();
    this.dataService.getPlants();
    this.dataService.getUsers();
  }

  getUser(){
    this.http.get<User>('api/users/' + this.userId + "/").subscribe(result => {
      this.user = result;
    })
  }

}
