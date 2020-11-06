import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantType } from 'src/app/shared/enums';

@Component({
  selector: 'app-admin-plants-dialog',
  templateUrl: './admin-plants-dialog.component.html',
  styleUrls: ['./admin-plants-dialog.component.css']
})
export class AdminPlantsDialogComponent implements OnInit {

  plantForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
  });

  plantType = PlantType;
  keys() : Array<string> {
      var keys = Object.keys(this.plantType);
      return keys.slice(keys.length / 2);
  }

  constructor(
    public dialogRef: MatDialogRef<AdminPlantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.plantForm.value);
  }

}
