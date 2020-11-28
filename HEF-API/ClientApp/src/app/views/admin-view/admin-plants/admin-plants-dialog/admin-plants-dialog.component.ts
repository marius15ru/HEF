import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantType } from 'src/app/shared/enums';
import { Plant } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-plants-dialog',
  templateUrl: './admin-plants-dialog.component.html',
  styleUrls: ['./admin-plants-dialog.component.css']
})
export class AdminPlantsDialogComponent implements OnInit {

  editMode: string;
  editDisabled: boolean = false;

  plantForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
  });

  plantType = PlantType;
  keys(): Array<string> {
      const keys = Object.keys(this.plantType);
      return keys.slice(keys.length / 2);
  }

  constructor(
    public dialogRef: MatDialogRef<AdminPlantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, plant: Plant}
  ) { }

  ngOnInit() {
    this.setMode();
  }

  onSubmit() {
    console.warn(this.plantForm.value);
  }

  setMode(){
    switch(this.dialogData.action.toLowerCase()){
      case 'insert':
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.editMode = 'Uppfæra';
        break;
      case 'view':
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'delete':
        this.editMode = 'Eyða';
        this.editDisabled = true;
        break;
    }
  }

}
