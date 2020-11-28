import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { recurring } from 'src/app/shared/enums';
import { Job } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})


export class AdminTasksDialogComponent implements OnInit {

  editMode: string;
  editDisabled: boolean = false;

  jobForm = new FormGroup({
    plant: new FormControl(''),
    user: new FormControl(''),
    station: new FormControl(''),
    name: new FormControl(''),
    status: new FormControl(''),
    recurring: new FormControl(''),
    duration: new FormControl(''),
    completeBy: new FormControl(''),
    emergencyJob: new FormControl(''),
    hasComments: new FormControl(''),
    lastCheck: new FormControl('')
  });

  recur = recurring;
  keys(): Array<string> {
      const keys = Object.keys(this.recur);
      return keys.slice(keys.length / 2);
  }

  constructor(
    public dialogRef: MatDialogRef<AdminTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, job: Job}
   ) {}

  ngOnInit() {
    this.setMode();
  }

  onSubmit() {
    console.warn(this.jobForm.value);
  }

  setMode(){
    switch(this.dialogData.action.toLowerCase()){
      case 'insert':
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.editMode = 'Uppfæra';
        break;
      case 'view':
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'delete':
        this.editMode = 'Eyða';
        this.editDisabled = true;
        break;
    }
  }

}
