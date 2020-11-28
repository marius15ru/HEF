import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Job } from 'src/app/shared/models';
import { AdminTasksDialogComponent } from './admin-tasks-dialog/admin-tasks-dialog.component';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  public jobs: Job[];

  constructor(public dialogItem: MatDialog, private http: HttpClient, @Inject('BASE_URL') baseUrl: string){
    http.get<Job[]>(baseUrl + 'api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
    }, error => console.error(error));
   }

  ngOnInit() {
  }

  openDialog(jobs:Job, action: string) {

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
