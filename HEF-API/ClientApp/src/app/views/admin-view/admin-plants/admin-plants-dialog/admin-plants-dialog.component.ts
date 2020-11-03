import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-plants-dialog',
  templateUrl: './admin-plants-dialog.component.html',
  styleUrls: ['./admin-plants-dialog.component.css']
})
export class AdminPlantsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminPlantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit() {
  }

}
