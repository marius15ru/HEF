import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models';

@Component({
  selector: 'app-obtain-task',
  templateUrl: './obtain-task.component.html',
  styleUrls: ['./obtain-task.component.css']
})
export class ObtainTaskComponent implements OnInit {

  jobs: Job[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
    }, error => console.error(error));
  }

}
