import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-areas-dialog',
  templateUrl: './admin-areas-dialog.component.html',
  styleUrls: ['./admin-areas-dialog.component.css']
})
export class AdminAreasDialogComponent implements OnInit {

  editMode: string;
  editDisabled = false;

  areaForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AdminAreasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, areas: Area}
  ) { }

  ngOnInit() {
    this.setMode();
  }

  onSubmit() {
    console.warn(this.areaForm.value);
  }

  setMode() {
    switch (this.dialogData.action.toLowerCase()) {
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
