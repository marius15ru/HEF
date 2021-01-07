import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Pipe, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Comment, EnumToArrayPipe, Job, JobAssignments, Station, User } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})


export class AdminTasksDialogComponent implements OnInit {

  // assignedUsers$: Observable<User[]> = this.assignedUsers;
  // unassignedUsers: Observable<User[]> = 

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

  allComments: Comment[] = [];
  jobComments: Comment[] = [];


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
      this.getJobAssignments();
      this.getJobComments();
    }
    this.setMode();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  getData(){
    this.stations = this.dataService.stations;
    this.users = this.dataService.users;
  }

  getJobAssignments() {
    console.log(this.selectedRow.id.toString());
    this.http.get<JobAssignments[]>('api/jobs/' + this.selectedRow.id.toString() + '/users').subscribe(result => {
      console.log(result);
      // this.jobAssignment = result;
      for (let i = 0; i < result.length; i++) {
        this.assignedIds[i] = result[i].id;
      }
      this.assignedUsers = this.users.filter((item) => this.assignedIds.includes(item.id));
      this.unassignedUsers = this.users.filter((item) => !this.assignedIds.includes(item.id));
      console.log(this.assignedUsers);
    });
  }

  getJobComments(){
    // this.http.get<Comment[]>('api/comments').subscribe(result => {
    //   this.allComments = result;
    //   this.jobComments = this.allComments.filter(item => item.jobId == this.selectedRow.id);
    //   console.log(this.jobComments, "athugasemdir");
    // }, error => console.error(error));
    this.allComments = this.dataService.comments;
    this.jobComments = this.allComments.filter(item => item.jobId == this.selectedRow.id);
  }

  assignUser() {
    console.log('');
  }

  onSubmit() {

    const requestModel: Job = this.jobForm.value;

    switch(this.dialogData.action.toLowerCase()){
      case 'insert':
        requestModel.completeBy = new Date(requestModel.completeBy);
        requestModel.lastCheck = new Date(requestModel.lastCheck);

        this.dataService.addJob(requestModel).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
        }, error => console.error(error));
        //     console.log(this.jobForm.value);
        //     const requestModelInsert: Job = this.jobForm.value;
        //     requestModelInsert.completeBy = new Date(requestModelInsert.completeBy);
        //     requestModelInsert.lastCheck = new Date(requestModelInsert.lastCheck);
        //     this.dataService.addJob(requestModelInsert).subscribe(result => {
        //       console.log(result);
        //     this.openSnackBar(requestModelInsert.name + ' bætt við', 'Loka');
        //     }, error => console.error(error));
        //     break;
        break;
      case 'update':
        const updateId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.updateJob(requestModel, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
        }, error => console.error(error));
        break;
        // switch (this.dialogData.action.toLowerCase()) {
        //   case 'insert':
        //   case 'update':
        //     const requestModelUpdate: Job = this.jobForm.value;
        //     requestModelUpdate.id = this.selectedRow.id;
        //     this.dataService.updateJob(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
        //       console.log(result, this.selectedRow.id.toString());
        //     this.openSnackBar(requestModelUpdate.name + ' uppfært', 'Loka');
        //     }, error => console.error(error));
        //     break;
      case 'delete':
        const deleteId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.deleteJob(requestModel, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' eytt', 'Loka');
        }, error => console.error(error));
        break;
    //   case 'delete':
    //     const requestModelDelete: Job = this.jobForm.value;
    //     requestModelDelete.id = this.selectedRow.id;
    //     this.dataService.deleteJob(requestModelDelete, this.selectedRow.id.toString()).subscribe(result => {
    //       console.log(result, this.selectedRow.id.toString(), 'deleted');
    //     this.openSnackBar(requestModelDelete.name + ' eytt', 'Loka');
    //     }, error => console.error(error));
    //     break;
        case 'comment':
          this.commentForm = new FormGroup({
            user: new FormControl({ value: parseInt(localStorage.getItem("user")) , disabled: true}),
            job: new FormControl({  value: this.selectedRow.id, disabled: true}),
            comment: new FormControl('')
          });
          break;
    }

      setTimeout(() => {
        this.dataService.getJobs();
      }, 500);

      this.closeDialog();
   }

   onSubmitAssignment(assignOption: string, index: User) {
     console.log('assign');
     switch (assignOption) {
       case 'insert':
         console.log('assignedInsert');
          const requestModelAssign: JobAssignments = this.assignmentForm.value;
          requestModelAssign.jobId = this.selectedRow.id;
          const userId: string = requestModelAssign.userId.toString() + '/';
          this.assignedUsers.push(index);

          this.dataService.addJobAssignment(requestModelAssign, userId).subscribe(result => {
            console.log(result, this.selectedRow.id.toString(), 'assigned insert');
          this.openSnackBar(requestModelAssign.userId.toString() + ' úthlutað verki ' + requestModelAssign.jobId.toString(), 'Loka');
          }, error => console.error(error));
          break;
      case 'delete':
          console.log('assignedDelete');
          const requestModelAssignDelete = new JobAssignments;
          requestModelAssignDelete.jobId = this.selectedRow.id;
          requestModelAssignDelete.userId = index.id;

          // console.log("Fyrir: ", this.assignedUsers);
          this.assignedUsers = this.assignedUsers.filter(item => item.id !== index.id);

          this.dataService.deleteJobAssignment(requestModelAssignDelete).subscribe(result => {
            console.log(result, 'assigned delete');
            this.openSnackBar('Úthlutun ' + requestModelAssignDelete.userId.toString() + ' á verki ' +
            requestModelAssignDelete.jobId.toString() + ' fjarlægð', 'Loka');
          }, error => console.error(error));
          break;
     }
     this.checkAssignment();
    //  this.closeDialog();
   }

   onSubmitComment() {
    const requestModel = new Comment;
    requestModel.text = this.commentForm.value.comment;
    requestModel.jobId = this.selectedRow.id;
    requestModel.userId = parseInt(localStorage.getItem("user"));
    console.log(requestModel);

    this.dataService.addJobComment(requestModel).subscribe(result => {
      console.log(result);
    });

    setTimeout(() => {
      this.dataService.getComments();
    }, 500);

    this.closeDialog();
  }

   closeDialog() {
    this.dialogRef.close('Closed');
  }

  checkAssignment() {
    if (this.assignedUsers.length === 0 && this.selectedRow.status !== 1) {
      console.log('Óúthlutað - Tómur array');
      this.selectedRow.status = 1;
      const requestModelUpdate: Job = this.selectedRow;
      this.dataService.updateJob(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
        console.log(result, this.selectedRow.id.toString());
      }, error => console.error(error));
    } else if (this.assignedUsers.length > 0 && this.selectedRow.status === 1) {
      console.log(this.assignedUsers.length);
      this.selectedRow.status = 2;
      const requestModelUpdate: Job = this.selectedRow;
      this.dataService.updateJob(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
        console.log(result, this.selectedRow.id.toString());
      }, error => console.error(error));
    }
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
          status: new FormControl({ value: '', disabled: false},
          ),
          recurring: new FormControl({ value: '', disabled: false},
          ),
          duration: new FormControl({ value: '', disabled: false},
          ),
          completeBy: new FormControl({ value: '', disabled: false},
          ),
          emergencyJob: new FormControl({ value: '', disabled: false},
          ),
          hasComments: new FormControl({ value: '', disabled: false},
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
        this.editMode = 'Úthluta';
        this.assignmentForm = new FormGroup({
          jobId: new FormControl({ value: this.selectedRow.id}),
          userId: new FormControl({ value: null})
        });
        break;
    }
  }

}
