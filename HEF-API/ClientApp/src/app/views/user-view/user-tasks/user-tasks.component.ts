import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GridModel, DetailRowService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Comment, Job, Station, User } from 'src/app/shared/models';
import { UserTaskDialogComponent } from './user-task-dialog/user-task-dialog.component';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserTasksComponent implements OnInit {
  userJobs: Job[] = [];
  jobsAssigned: Job[] = [];
  jobsOnHold: Job[] = [];
  jobsInProgress: Job[] = [];
  jobsFinished: Job[] = [];
  stations: Station[] = [];
  comments: Comment[] = [];

  pageSettings: object;

  user: User;
  userId: string = localStorage.getItem("user").toString();
  
  public customAttributes: Object;

  constructor(private http: HttpClient, private dataService: DataService, public dialogItem: MatDialog) { }

  ngOnInit() {
    this.getData();
    this.pageSettings = { pageSizes: [5, 25, 50, 100, 200, 300, 'All'], pageSize: 5};
    this.customAttributes = {class: 'customcss'};
  }

  recurFormatter(field: string, data: Object, column: Object) {
    return Recurring[data[field]];
  }

  statusFormatter(field: string, data: Object, column: Object) {
    return JobStatus[data[field]];
  }

  boolFormatter(field: string, data: Object, column: Object) {
    if (data[field] === true) {
      return 'Já';
    } else {
      return 'Nei';
    }
  }

  stationFormatter(field: string, data: Object, column: Object) {
    return data[field].name;
  }

  getData(){
    this.http.get<Job[]>('api/users/' + this.userId + '/jobs').subscribe(result => {
      console.log(result);
      this.userJobs = result;
      this.jobsAssigned = this.userJobs.filter(item => item.status === 2);
      this.jobsInProgress = this.userJobs.filter(item => item.status === 3);
      this.jobsOnHold = this.userJobs.filter(item => item.status === 4);
      this.jobsFinished = this.userJobs.filter(item => item.status === 5);
    }, error => console.error(error));

    this.http.get<Station[]>('api/stations').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));

    this.http.get<Comment[]>('api/comments').subscribe(result => {
      console.log(result);
      this.comments = result;
    }, error => console.error(error));
  }

  openDialog(jobs: Job, action: string) {
    const refUser = this.dialogItem.open(UserTaskDialogComponent, {
      data: {
        action: action,
        job: jobs,
        stations: this.stations
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
      this.getData();
    });
  }

}
