import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-location-dialog',
  templateUrl: './admin-location-dialog.component.html',
  styleUrls: ['./admin-location-dialog.component.css']
})
export class AdminLocationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit() {
  }

}
