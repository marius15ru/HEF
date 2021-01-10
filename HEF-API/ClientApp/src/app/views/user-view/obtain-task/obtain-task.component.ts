import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Job, JobAssignments, Station, User, Comment } from 'src/app/shared/models';
import { ObtainTaskDialogComponent } from './obtain-task-dialog/obtain-task-dialog.component';

@Component({
  selector: 'app-obtain-task',
  templateUrl: './obtain-task.component.html',
  styleUrls: ['./obtain-task.component.css']
})
export class ObtainTaskComponent implements OnInit {
  availableJobs$: Observable<Job[]> = this.dataService.availableJobs$;
  jobs$: Observable<Job[]> = this.dataService.jobs$;

  stations: Station[] = [];
  comments: Comment[] = [];
  assignedUsers: User[] = [];

  // assignmentForm = new FormGroup({
  //   jobId: new FormControl(null),
  //   userId: new FormControl(null)
  // });

  jobs: Job[];
  availableJobs: Job[];

  userId = localStorage.getItem('user');

  public customAttributes: Object;

  constructor(
    private http: HttpClient, 
    private dataService: DataService, 
    private _snackBar: MatSnackBar,
    public dialogItem: MatDialog) { }

  ngOnInit() {
    // this.getData();
    this.stations = this.dataService.stations;
    this.comments = this.dataService.comments;
    this.assignedUsers = this.dataService.assignedUsers;
    // this.availableJobs = this.dataService.availableJobs;
    this.customAttributes = {class: 'customcss'};
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }


  getData() {
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
      this.availableJobs = this.jobs.filter(item => item.status === 1);
    }, error => console.error(error));
  }

  onSubmit(job: Job){
    const requestModelAssign: JobAssignments = new JobAssignments;
    console.log('assignedInsert');
    requestModelAssign.jobId = job.id;
    requestModelAssign.userId = parseInt(this.userId);
    const userId: string = requestModelAssign.userId.toString() + '/';

    if(job.status == 1){
      const requestModelJob = job;
      requestModelJob.status = 2;
      this.dataService.updateJob(requestModelJob, requestModelJob.id.toString()).subscribe(result => {

      });
    }
    this.dataService.addJobAssignment(requestModelAssign, userId).subscribe(result => {
      console.log(result, job.name, 'assigned insert');
      this.openSnackBar('Þér hefur verið úthlutað verki ' + job.name, 'Loka');
      }, error => console.error(error));

    setTimeout(() => {
      this.dataService.getJobs();
      }, 300);

      setTimeout(() => {
        this.dataService.getUserJobs(parseInt(this.userId));
      }, 300);
  }

  // onSubmit(job: Job) {
  //   console.log('assign');
  //   const requestModelAssign = new JobAssignments;
  //   console.log('assignedInsert');
  //   requestModelAssign.jobId = job.id;
  //   requestModelAssign.userId = parseInt(this.userId);
  //   const userId: string = requestModelAssign.userId.toString() + '/';
  //   // this.assignedUsers.push(index);

  //   this.dataService.addJobAssignment(requestModelAssign, userId).subscribe(result => {
  //     console.log(result, job.name, 'assigned insert');
  //     this.openSnackBar(requestModelAssign.userId + ' úthlutað verki ' + job.name, 'Loka');
  //     }, error => console.error(error));
     
  //    this.checkAssignment(job, this.dataService.assignedUsers);
  // }

  // checkAssignment(job: Job, assignedUsers: User[]) {
  //   setTimeout(() => {
  //     this.dataService.getJobAssignments(job);
  //    }, 300);
  //   if (assignedUsers.length === 0 && this.dataService.assignedUsers.length > 0 && job.status !== 1) {
  //     console.log('Óúthlutað - Tómur array');
  //     job.status = 1;
  //     const requestModelUpdate: Job = job;
  //     this.dataService.updateJob(requestModelUpdate, job.id.toString()).subscribe(result => {
  //       console.log(result, job.id.toString());
  //     }, error => console.error(error));
  //   } else if (assignedUsers.length > 0 &&  this.dataService.assignedUsers.length > 0 && job.status === 1) {
  //     console.log(assignedUsers.length);
  //     job.status = 2;
  //     const requestModelUpdate: Job = job;
  //     this.dataService.updateJob(requestModelUpdate, job.id.toString()).subscribe(result => {
  //       console.log(result, job.id.toString());
  //     }, error => console.error(error));


  //     setTimeout(() => {
  //       this.dataService.getJobs();
  //      }, 300);

  //      setTimeout(() => {
  //       this.dataService.getUserJobs(parseInt(this.userId));
  //      }, 300);
  //   }

  //   setTimeout(() => {
  //     this.dataService.getJobs();
  //   }, 300);

  //   setTimeout(() => {
  //     this.dataService.getUserJobs(parseInt(this.userId));
  //   }, 300);
  // }

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
