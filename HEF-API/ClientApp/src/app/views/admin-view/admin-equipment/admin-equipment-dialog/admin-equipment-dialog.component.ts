import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-equipment-dialog',
  templateUrl: './admin-equipment-dialog.component.html',
  styleUrls: ['./admin-equipment-dialog.component.css']
})
export class AdminEquipmentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit() {
  }

}
