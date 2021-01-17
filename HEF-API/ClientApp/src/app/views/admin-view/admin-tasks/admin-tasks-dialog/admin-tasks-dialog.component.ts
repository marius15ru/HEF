import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Pipe, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridComponent, RowDataBoundEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Comment, EnumToArrayPipe, Job, JobAssignments, Station, User } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})

export class AdminTasksDialogComponent implements OnInit {

  assignedUsers$: Observable<User[]> = this.dataService.assignedUsers$;
  unassignedUsers$: Observable<User[]> = this.dataService.unassignedUsers$;
  jobComments$: Observable<Comment[]> = this.dataService.jobComments$;

  unSeenComments: Comment[] = [];
  editMode: string;
  editDisabled = false;
  selectedRow: Job;
  recur = Recurring;
  jobStatus = JobStatus;
  stations: Station[];
  recurIndex: number;
  statusIndex: number;
  jobAssignment: JobAssignments[];
  assignedIds: number[] = [];
  users: User[] = [];
  assignedUsers: User[] = [];
  unassignedUsers: User[] = [];

  // allComments: Comment[] = [];
  // jobComments: Comment[] = [];

  pageSettings: Object;
  public customAttributes: Object;



  commentForm = new FormGroup({
    user: new FormControl(''),
    job: new FormControl(''),
    comment: new FormControl('')
  });

  boolArray: Boolean[] = [true, false];

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

  assignmentForm = new FormGroup({
    jobId: new FormControl(null),
    userId: new FormControl(null)
  });

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(
    private dataService: DataService, public dialogRef: MatDialogRef<AdminTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job}, private _snackBar: MatSnackBar,
    private http: HttpClient) { }

  ngOnInit() {
    this.pageSettings = { pageSizes: [5, 25, 50, 100, 200, 300, 'All'], pageSize: 5};
    this.customAttributes = {class: 'customcss'};
    this.getData();
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new Job();
      this.selectedRow.stationId = null;
      this.selectedRow.name = '';
      this.selectedRow.description = '';
      this.selectedRow.status = null;
      this.selectedRow.recurring = null;
      this.selectedRow.duration = '';
      this.selectedRow.completeBy = null;
      this.selectedRow.emergencyJob = null;
      this.selectedRow.lastCheck = null;
    } else {
      this.selectedRow = this.dialogData.job;
    }
    this.setMode();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  getCurrentDate() {
    const today = new Date();
    return today;
  }

  getData() {
    this.stations = this.dataService.stations;
    this.users = this.dataService.users;
  }

  onSubmit() {
    const requestModel: Job = this.jobForm.value;
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        requestModel.completeBy = new Date(requestModel.completeBy);
        requestModel.lastCheck = new Date(requestModel.lastCheck);
        this.dataService.addJob(requestModel).subscribe(result => {
          this.dataService.getJobs();
          this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
          }, error => console.error(error));
        break;
      case 'update':
        const updateId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.updateJob(requestModel, this.selectedRow.id.toString()).subscribe(result => {
          this.dataService.getJobs();
          this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
        }, error => console.error(error));
        break;
      case 'delete':
        if (this.dataService.assignedUsers.length > 0) {
          this.dataService.jobAssignments.forEach(assignment => {
            const requestModelAssignDelete = new JobAssignments;
            requestModelAssignDelete.jobId = this.selectedRow.id;
            requestModelAssignDelete.userId = assignment.id;
            this.dataService.deleteJobAssignment(requestModelAssignDelete).subscribe(result => {
              console.log(result);
            }, error => console.error(error));
          });
        }
        if (this.selectedRow.hasComments === true) {
          this.dataService.jobComments.forEach(comment => {
            this.dataService.deleteJobComment(comment).subscribe(result => {
              console.log(result);
            }, error => console.error(error));
          });
        }

        this.dataService.deleteJob(this.selectedRow, this.selectedRow.id.toString()).subscribe(result => {
          this.dataService.getJobs();
        this.openSnackBar(this.selectedRow.name + ' eytt', 'Loka');
        }, error => console.error(error));
        break;
    }
      this.closeDialog();
   }

   onSubmitAssignment(assignOption: string, index: User) {
     console.log('assign');
     const job = this.selectedRow;
     switch (assignOption) {
       case 'insert':
          const requestModelAssign: JobAssignments = this.assignmentForm.value;
          console.log('assignedInsert');
          requestModelAssign.jobId = this.selectedRow.id;
          const userId: string = requestModelAssign.userId.toString() + '/';

          this.dataService.addJobAssignment(requestModelAssign, userId).subscribe(result => {
            this.dataService.getJobAssignments(this.selectedRow);
            console.log(result, this.selectedRow.name, 'assigned insert');
            if (this.selectedRow.status === 1) {
              const requestModelJob = this.selectedRow;
              requestModelJob.status = 2;
              this.dataService.updateJob(requestModelJob, requestModelJob.id.toString()).subscribe(_ => {
                this.dataService.getJobs();
              });
            }
          }, error => console.error(error));
          this.openSnackBar(index.name + ' úthlutað verki ' + this.dialogData.job.name, 'Loka');
          break;
      case 'delete':
          console.log('assignedDelete');
          const requestModelAssignDelete = new JobAssignments;
          requestModelAssignDelete.jobId = this.selectedRow.id;
          requestModelAssignDelete.userId = index.id;
          this.dataService.deleteJobAssignment(requestModelAssignDelete).subscribe(result => {
            this.dataService.getJobAssignments(this.selectedRow);
            if (this.selectedRow.status !== 1 && this.dataService.assignedUsers.length === 1) {
              const requestModelJob = this.selectedRow;
              requestModelJob.status = 1;
              this.dataService.updateJob(requestModelJob, requestModelJob.id.toString()).subscribe(_ => {
                this.dataService.getJobs();
              });
            }
            this.openSnackBar('Úthlutun ' + index.name + ' á verki ' +
            this.selectedRow.name + ' fjarlægð', 'Loka');
          }, error => console.error(error));
          break;
     }
   }

   onSubmitComment() {
    const requestModel = new Comment;
    requestModel.text = this.commentForm.value.comment;
    requestModel.jobId = this.selectedRow.id;
    requestModel.userId = parseInt(localStorage.getItem('user'), 0);
    console.log(requestModel);

    this.dataService.addJobComment(requestModel).subscribe(result => {
      this.commentForm.reset();
      this.dataService.getComments(this.selectedRow.id);
      if (this.selectedRow.hasComments === false) {
        const requestModelJob = this.selectedRow;
        requestModelJob.hasComments = true;
        this.dataService.updateJob(requestModelJob, requestModelJob.id.toString()).subscribe(_ => {
          this.dataService.getJobs();
        });
      }
    });
  }

   closeDialog() {
    this.dialogRef.close('Closed');
  }

  setMode() {
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        this.jobForm = new FormGroup({
          stationId: new FormControl({ value: '', disabled: false},
          ),
          name: new FormControl({ value: '', disabled: false},
          ),
          description: new FormControl({ value: '', disabled: false},
          ),
          status: new FormControl({ value: 1, disabled: false},
          ),
          recurring: new FormControl({ value: '', disabled: false},
          ),
          duration: new FormControl({ value: '', disabled: false},
          ),
          completeBy: new FormControl({ value: '', disabled: false},
          ),
          emergencyJob: new FormControl({ value: '', disabled: false},
          ),
          hasComments: new FormControl({ value: false, disabled: false},
          ),
          lastCheck: new FormControl({ value: '', disabled: false},
          ),
        });
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.jobForm = new FormGroup({
          stationId: new FormControl({ value: this.selectedRow.stationId, disabled: false},
          ),
          name: new FormControl({ value: this.selectedRow.name, disabled: false},
          ),
          description: new FormControl({ value: this.selectedRow.description, disabled: false},
          ),
          status: new FormControl({ value: this.selectedRow.status, disabled: false},
          ),
          recurring: new FormControl({ value: this.selectedRow.recurring, disabled: false},
          ),
          duration: new FormControl({ value: this.selectedRow.duration, disabled: false},
          ),
          completeBy: new FormControl({ value: this.selectedRow.completeBy, disabled: false},
          ),
          emergencyJob: new FormControl({ value: this.selectedRow.emergencyJob, disabled: false},
          ),
          hasComments: new FormControl({ value: this.selectedRow.hasComments, disabled: false},
          ),
          lastCheck: new FormControl({ value: this.selectedRow.lastCheck, disabled: false},
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
      case 'delete':
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
        this.editMode = 'Eyða';
        // this.editDisabled = true;
        break;
      case 'assign':
        this.dataService.getJobAssignments(this.dialogData.job);
        this.editMode = 'Úthluta';
        this.assignmentForm = new FormGroup({
          jobId: new FormControl({ value: this.selectedRow.id}),
          userId: new FormControl({ value: null})
        });
        break;
      case 'comment':
        this.dataService.getComments(this.dialogData.job.id, this.dataService.user.id);
        break;
    }
  }
}
