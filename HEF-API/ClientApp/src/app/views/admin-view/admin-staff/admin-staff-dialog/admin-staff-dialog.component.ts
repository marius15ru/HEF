import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-staff-dialog',
  templateUrl: './admin-staff-dialog.component.html',
  styleUrls: ['./admin-staff-dialog.component.css']
})
export class AdminStaffDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
  }

}
