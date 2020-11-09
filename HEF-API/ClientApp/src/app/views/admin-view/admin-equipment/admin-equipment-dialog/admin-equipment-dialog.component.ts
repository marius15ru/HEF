import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-equipment-dialog',
  templateUrl: './admin-equipment-dialog.component.html',
  styleUrls: ['./admin-equipment-dialog.component.css']
})
export class AdminEquipmentDialogComponent implements OnInit {

  dialogAction: '';

  equipmentForm = new FormGroup({
    location: new FormControl(''),
    name: new FormControl(''),
    model: new FormControl(''),
    manufacturer: new FormControl(''),
    operation: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AdminEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.equipmentForm.value);
  }

}
