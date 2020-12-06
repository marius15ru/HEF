import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recurring } from 'src/app/shared/enums';
import { Job } from 'src/app/shared/models';
import { AdminTasksDialogComponent } from './admin-tasks-dialog/admin-tasks-dialog.component';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  jobs: Job[];
  alteredJobs: Job[] = [];
  @Inject('BASE_URL') baseUrl: string

  constructor(public dialogItem: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
      // let index = Recurring["Annan hvern mánuð"].valueOf();
      // console.log(index);
      // this.jobs.forEach((value, index) => this.jobs[index].recurring = Recurring[this.jobs[index].recurring]);
      // console.log(this.alteredJobs, "altered");
    }, error => console.error(error));
  }

  openDialog(jobs: Job, action: string) {

    const refUser = this.dialogItem.open(AdminTasksDialogComponent, {
      data: {
        action: action,
        job: jobs
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }
}
