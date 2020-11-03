import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-tasks-dialog',
  templateUrl: './admin-tasks-dialog.component.html',
  styleUrls: ['./admin-tasks-dialog.component.css']
})
export class AdminTasksDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
   ) {}

  ngOnInit() {
  }

}
