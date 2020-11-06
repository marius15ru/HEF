import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeFrame } from 'src/app/shared/enums';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})


export class AdminTasksDialogComponent implements OnInit {
  workOrderForm = new FormGroup({
    plant: new FormControl(''),
    user: new FormControl(''),
    location: new FormControl(''),
    name: new FormControl(''),
    status: new FormControl(''),
    timeFrame: new FormControl(''),
    duration: new FormControl(''),
    completeBy: new FormControl(''),
    emergencyJob: new FormControl(''),
    hasComments: new FormControl(''),
    lastCheck: new FormControl('')
  });

  timeFrame = TimeFrame;
  keys() : Array<string> {
      var keys = Object.keys(this.timeFrame);
      return keys.slice(keys.length / 2);
  }

  constructor(
    public dialogRef: MatDialogRef<AdminTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
   ) {}

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.workOrderForm.value);
  }

}
