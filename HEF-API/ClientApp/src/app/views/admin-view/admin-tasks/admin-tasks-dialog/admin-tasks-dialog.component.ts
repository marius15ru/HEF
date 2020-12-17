import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Pipe, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { EnumToArrayPipe, Job, JobAssignments, Station, User } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})


export class AdminTasksDialogComponent implements OnInit {

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

  // keys(): Array<string> {
  //     const keys = Object.keys(this.recur);
  //     return keys.slice(keys.length / 2);
  // }

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(
    private dataService: DataService, public dialogRef: MatDialogRef<AdminTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job},
    private http: HttpClient) {}


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
    }else{
      this.selectedRow = this.dialogData.job;
    }
    this.setMode();
    this.getJobAssignments();
  }

  getData(){
    this.http.get<Station[]>('api/stations').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));

    this.http.get<User[]>('api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));

 
  }

  getJobAssignments(){
    console.log(this.selectedRow.id.toString());
    this.http.get<JobAssignments[]>('api/jobs/' + this.selectedRow.id.toString() + "/users").subscribe(result => {
      console.log(result);
      // this.jobAssignment = result;
      for(var i = 0; i < result.length; i++){
        this.assignedIds[i] = result[i].id;
      }
      this.assignedUsers = this.users.filter((item) => this.assignedIds.includes(item.id));
      this.unassignedUsers = this.users.filter((item) => !this.assignedIds.includes(item.id));
      console.log(this.assignedUsers);
    })
  }

  assignUser(){
    console.log();
  }

  onSubmit() {
    switch (this.dialogData.action.toLowerCase()){
      case 'insert':
        console.log(this.jobForm.value);
        let requestModelInsert: Job = this.jobForm.value;
        requestModelInsert.completeBy = new Date(requestModelInsert.completeBy);
        requestModelInsert.lastCheck = new Date(requestModelInsert.lastCheck);
        this.dataService.addJob(requestModelInsert).subscribe(result => {
          console.log(result);
        }, error => console.error(error));
        break;
      case 'update':
        let requestModelUpdate: Job = this.jobForm.value;
        requestModelUpdate.id = this.selectedRow.id;
        this.dataService.updateJob(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result, this.selectedRow.id.toString());
        }, error => console.error(error));
        break;
      case 'delete':
        let requestModelDelete: Job = this.jobForm.value;
        requestModelDelete.id = this.selectedRow.id;
        this.dataService.deleteJob(requestModelDelete, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result, this.selectedRow.id.toString(), "deleted");
        }, error => console.error(error));
        break;
      case 'assign':
        console.log("assign");
        let requestModelAssign: JobAssignments = this.assignmentForm.value;
        requestModelAssign.jobId = this.selectedRow.id;
        let userId: string = requestModelAssign.userId.toString() + '/';
        console.log(requestModelAssign);
        this.dataService.addJobAssignment(requestModelAssign, userId).subscribe(result => {
          console.log(result, this.selectedRow.id.toString(), "assigned");
        }, error => console.error(error));
        break;
    }
      this.closeDialog();
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
        this.editMode = "Úthluta";
        this.assignmentForm = new FormGroup({
          jobId: new FormControl({ value: this.selectedRow.id}),
          userId: new FormControl({ value: null})
        });
        break;
    }
  }

}
