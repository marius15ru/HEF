import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-location-dialog',
  templateUrl: './admin-location-dialog.component.html',
  styleUrls: ['./admin-location-dialog.component.css']
})
export class AdminLocationDialogComponent implements OnInit {

  locationForm = new FormGroup({
    name: new FormControl(''),
    plant: new FormControl(''),
    municipal: new FormControl(''),
    address: new FormControl(''),
    coOrdinates: new FormControl(''),
    preciseLocation: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AdminLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.locationForm.value);
  }


}
