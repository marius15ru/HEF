import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { EnumToArrayPipe, Job, Station } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})


export class AdminTasksDialogComponent implements OnInit {

  editMode: string;
  editDisabled: boolean = false;
  selectedRow: Job;
  recur = Recurring;
  jobStatus = JobStatus;
  stations: Station[];

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

  // keys(): Array<string> {
  //     const keys = Object.keys(this.recur);
  //     return keys.slice(keys.length / 2);
  // }

  constructor(
    public dialogRef: MatDialogRef<AdminTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job},
    private http: HttpClient, @Inject('BASE_URL') baseUrl: string){
      http.get<Station[]>(baseUrl + 'api/stations').subscribe(result => {
        console.log(result, "in admin tasks dialog");
        this.stations = result;
      }, error => console.error(error));
     }


  ngOnInit() {
    this.selectedRow = this.dialogData.job;
    if(this.dialogData.action.toLowerCase() == "insert"){
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
    }
    this.setMode();
  }

  onSubmit() {
    console.warn(this.jobForm.value);
  }

  setMode(){
    switch(this.dialogData.action.toLowerCase()){
      case 'insert':
        this.jobForm = new FormGroup({
          station: new FormControl({ value: '', disabled: false}, 
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
          station: new FormControl({ value: this.selectedRow.stationId, disabled: false}, 
          ),
          name: new FormControl({ value: this.selectedRow.name, disabled: false}, 
          ),
          description: new FormControl({ value: '', disabled: false}, 
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
          station: new FormControl({ value: this.selectedRow.stationId, disabled: true}, 
          ),
          name: new FormControl({ value: this.selectedRow.name, disabled: true}, 
          ),
          description: new FormControl({ value: '', disabled: false}, 
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
          station: new FormControl({ value: this.selectedRow.stationId, disabled: true}, 
          ),
          name: new FormControl({ value: this.selectedRow.name, disabled: true}, 
          ),
          description: new FormControl({ value: '', disabled: false}, 
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
        this.editDisabled = true;
        break;
    }
  }

}
