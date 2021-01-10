import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Job, Comment, Station } from 'src/app/shared/models';
import { UserTasksComponent } from '../user-tasks.component';

@Component({
  selector: 'app-user-task-dialog',
  templateUrl: './user-task-dialog.component.html',
  styleUrls: ['./user-task-dialog.component.css']
})
export class UserTaskDialogComponent implements OnInit {
  selectedRow: Job;
  stations: Station[];

  editMode: string;
  editDisabled = false;

  recur = Recurring;
  jobStatus = JobStatus;

  allComments: Comment[] = [];
  jobComments: Comment[] = [];

  userId: number = parseInt(localStorage.getItem("user"));


  jobForm = new FormGroup({
    station: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    recurring: new FormControl(''),
    duration: new FormControl(''),
    completeBy: new FormControl(''),
    emergencyJob: new FormControl(''),
    hasComments: new FormControl(''),
    lastCheck: new FormControl('')
  });

  commentForm = new FormGroup({
    user: new FormControl(''),
    job: new FormControl(''),
    comment: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<UserTasksComponent>, 
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: {action: string, job: Job, stations: Station[]}) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.job;
    this.stations = this.dialogData.stations;
    this.getJobComments(this.dialogData.job);
    this.setMode();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  getJobComments(job: Job){
    this.allComments = this.dataService.comments;
    this.jobComments = this.allComments.filter(item => item.jobId == job.id);
  }

  onSubmit() {
    let requestModel = this.selectedRow;
    requestModel.status = this.jobForm.value.status;

    const updateId: string = this.selectedRow.id.toString();

    console.log(requestModel);
    this.dataService.updateJob(requestModel, this.selectedRow.id.toString()).subscribe(result => {
      console.log(result);
    this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
    }, error => console.error(error));

    setTimeout(() => {
      this.dataService.getJobs();
      // this.dataService.getUserJobs(this.selectedRow.id);
    }, 500);

    this.closeDialog();
 }

   closeDialog() {
    this.dialogRef.close('Closed');
  }

  onSubmitComment() {
    const requestModel = new Comment;
    requestModel.text = this.commentForm.value.comment;
    requestModel.jobId = this.selectedRow.id;
    // requestModel.userId = 1;
    requestModel.userId = this.userId;
    // console.log(requestModel);

    if(this.selectedRow.hasComments == false){
      const requestModelJob = this.selectedRow;
      requestModelJob.hasComments = true;
      this.dataService.updateJob(requestModelJob, requestModelJob.id.toString()).subscribe(result => {

      });
    }

    this.dataService.addJobComment(requestModel).subscribe(result => {
      console.log(result);
    });

    setTimeout(() => {
      this.dataService.getComments();
    }, 300);
    
    this.dataService.getUserJobs(requestModel.userId);
  }

  setMode() {

    switch (this.dialogData.action.toLowerCase()) {
      case 'update':
        this.jobForm = new FormGroup({
          stationId: new FormControl({ value: this.selectedRow.stationId, disabled: true},
          ),
          name: new FormControl({ value: this.selectedRow.name, disabled: true},
          ),
          description: new FormControl({ value: this.selectedRow.description, disabled: true},
          ),
          status: new FormControl({ value: this.selectedRow.status, disabled: false},
          ),
          recurring: new FormControl({ value: this.selectedRow.recurring, disabled: true},
          ),
          duration: new FormControl({ value: this.selectedRow.duration, disabled: true},
          ),
          completeBy: new FormControl({ value: this.selectedRow.completeBy, disabled: true},
          ),
          emergencyJob: new FormControl({ value: this.selectedRow.emergencyJob, disabled: true},
          ),
          hasComments: new FormControl({ value: this.selectedRow.hasComments, disabled: true},
          ),
          lastCheck: new FormControl({ value: this.selectedRow.lastCheck, disabled: true},
          ),
        });
        // this.actionButtonVisible = false;
        // this.dialogTitle = "Skoða: ";
        this.editMode = 'Uppfæra';
        break;
      case 'view':
        this.jobForm = new FormGroup({
          stationId: new FormControl({ value: this.selectedRow.stationId, disabled: true},
          ),
          name: new FormControl({ value: this.selectedRow.name, disabled: true},
          ),
          description: new FormControl({ value: this.selectedRow.description, disabled: true},
          ),
          status: new FormControl({ value: this.selectedRow.status, disabled: true},
          ),
          recurring: new FormControl({ value: this.selectedRow.recurring, disabled: true},
          ),
          duration: new FormControl({ value: this.selectedRow.duration, disabled: true},
          ),
          completeBy: new FormControl({ value: this.selectedRow.completeBy, disabled: true},
          ),
          emergencyJob: new FormControl({ value: this.selectedRow.emergencyJob, disabled: true},
          ),
          hasComments: new FormControl({ value: this.selectedRow.hasComments, disabled: true},
          ),
          lastCheck: new FormControl({ value: this.selectedRow.lastCheck, disabled: true},
          ),
        });
        // this.actionButtonVisible = false;
        // this.dialogTitle = "Skoða: ";
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'comment':
        this.commentForm = new FormGroup({
          user: new FormControl({ value: 1, disabled: true}),
          job: new FormControl({  value: this.dialogData.job.id, disabled: true}),
          comment: new FormControl('')
        });
        break;
    }
  }
}
