import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Job, JobAssignments, User } from 'src/app/shared/models';
import { ObtainTaskDialogComponent } from './obtain-task-dialog/obtain-task-dialog.component';

@Component({
  selector: 'app-obtain-task',
  templateUrl: './obtain-task.component.html',
  styleUrls: ['./obtain-task.component.css']
})
export class ObtainTaskComponent implements OnInit {

  jobs: Job[];
  availableJobs: Job[];

  public customAttributes: Object;

  constructor(private http: HttpClient, private dataService: DataService, public dialogItem: MatDialog) { }

  ngOnInit() {
    this.getData();
    this.customAttributes = {class: 'customcss'};
  }

  getData() {
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
      this.availableJobs = this.jobs.filter(item => item.status === 1);
    }, error => console.error(error));
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

  openDialog(jobs: Job, action: string) {
    const refUser = this.dialogItem.open(ObtainTaskDialogComponent, {
      data: {
        action: action,
        job: jobs
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
      this.getData();
    });
  }

}
