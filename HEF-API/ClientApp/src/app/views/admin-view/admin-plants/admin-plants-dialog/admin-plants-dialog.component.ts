import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { PlantType } from 'src/app/shared/enums';
import { Plant } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-plants-dialog',
  templateUrl: './admin-plants-dialog.component.html',
  styleUrls: ['./admin-plants-dialog.component.css']
})
export class AdminPlantsDialogComponent implements OnInit {

  editMode: string;
  editDisabled = false;

  selectedRow: Plant;

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
    private dataService: DataService, public dialogRef: MatDialogRef<AdminPlantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, plant: Plant}, private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.plant;
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new Plant();
      this.selectedRow.name = '';
    }
    this.setMode();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  onSubmit() {
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        const requestModel: Plant = this.plantForm.value;
        this.dataService.addPlant(requestModel).subscribe(result => {
          console.log(result);
          this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
        }, error => console.error(error));
        break;
      case 'update':
        const requestModelUpdate: Plant = this.plantForm.value;
        requestModelUpdate.id = this.selectedRow.id;
        requestModelUpdate.name = this.selectedRow.name;
        this.dataService.updatePlant(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result, this.selectedRow.id.toString());
        this.openSnackBar(requestModelUpdate.name + ' uppfærð', 'Loka');
        }, error => console.error(error));
        break;
      case 'delete':
        const requestModelDelete: Plant = this.plantForm.value;
        requestModelDelete.id = this.selectedRow.id;
        requestModelDelete.name = this.selectedRow.name;
        this.dataService.deletePlant(requestModelDelete, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result, this.selectedRow.id.toString(), 'deleted');
        this.openSnackBar(requestModelDelete.name + ' eytt', 'Loka');
        }, error => console.error(error));
        break;
    }
      this.closeDialog();
   }

   closeDialog() {
    this.dialogRef.close('Closed');
  }


  setMode() {
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: false},
          ),
        });
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.editMode = 'Uppfæra';
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: false},
          ),
        });
        break;
      case 'view':
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'delete':
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Eyða';
        this.editDisabled = true;
        break;
    }
  }

}
