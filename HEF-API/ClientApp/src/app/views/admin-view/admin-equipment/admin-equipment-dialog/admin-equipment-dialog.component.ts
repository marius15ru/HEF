import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipment } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-equipment-dialog',
  templateUrl: './admin-equipment-dialog.component.html',
  styleUrls: ['./admin-equipment-dialog.component.css']
})
export class AdminEquipmentDialogComponent implements OnInit {

  dialogAction: '';
  editMode: string;
  editDisabled = false;

  equipmentForm = new FormGroup({
    station: new FormControl(''),
    name: new FormControl(''),
    model: new FormControl(''),
    manufacturer: new FormControl(''),
    operation: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AdminEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, equipments: Equipment}
  ) { }

  ngOnInit() {
    this.setMode();
  }

  onSubmit() {
    console.warn(this.equipmentForm.value);
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
