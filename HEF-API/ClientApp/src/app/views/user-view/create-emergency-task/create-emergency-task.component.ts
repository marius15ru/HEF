import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Area, Plant, Station, User } from 'src/app/shared/models';

@Component({
  selector: 'app-create-emergency-task',
  templateUrl: './create-emergency-task.component.html',
  styleUrls: ['./create-emergency-task.component.css']
})
export class CreateEmergencyTaskComponent implements OnInit {
  user: User;
  userId: string = localStorage.getItem("user").toString();
  stations: Station[] = [];
  areas: Area[] = [];
  users: User[] = [];
  plants: Plant[] = [];

  emergencyJobForm = new FormGroup({
    name: new FormControl(''),
    area: new FormControl(''),
    plant: new FormControl(''),
    jobUser: new FormControl(''),
    text: new FormControl('')
  });

  constructor(private http: HttpClient) { }



  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get<Station[]>('api/stations').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));

    this.http.get<Area[]>('api/areas').subscribe(result => {
      console.log(result);
      this.areas = result;
    }, error => console.error(error));

    this.http.get<User[]>('api/users').subscribe(result => {
      console.log(result);
      this.users = result;
    }, error => console.error(error));

    this.http.get<Plant[]>('api/plants').subscribe(result => {
      console.log(result);
      this.plants = result;
    }, error => console.error(error));
  }

  onSubmit(){
    console.log(this.emergencyJobForm.value);
  }

}
