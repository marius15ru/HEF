import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recuring } from 'src/app/shared/enums';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})


export class AdminTasksDialogComponent implements OnInit {
  jobForm = new FormGroup({
    plant: new FormControl(''),
    user: new FormControl(''),
    location: new FormControl(''),
    name: new FormControl(''),
    status: new FormControl(''),
    recuring: new FormControl(''),
    duration: new FormControl(''),
    completeBy: new FormControl(''),
    emergencyJob: new FormControl(''),
    hasComments: new FormControl(''),
    lastCheck: new FormControl('')
  });

  recur = Recuring;
  keys(): Array<string> {
      const keys = Object.keys(this.recur);
      return keys.slice(keys.length / 2);
  }

  constructor(
    public dialogRef: MatDialogRef<AdminTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
   ) {}

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.jobForm.value);
  }

}
