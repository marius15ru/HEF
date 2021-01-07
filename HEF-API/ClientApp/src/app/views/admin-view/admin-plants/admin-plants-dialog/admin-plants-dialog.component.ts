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
    const requestModel: Plant = this.plantForm.value;

    switch(this.dialogData.action.toLowerCase()){
      case 'insert':
        this.dataService.addPlant(requestModel).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
        }, error => console.error(error));
        break;
      case 'update':
        const updateId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.updatePlant(requestModel, updateId).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
        }, error => console.error(error));
        break;
      case 'delete':
        const deleteId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.deletePlant(requestModel, deleteId).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' eytt', 'Loka');
        }, error => console.error(error));
        break;
    }
    setTimeout(()=> {
      this.dataService.getPlants();
    }, 500);
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
        break;
      case 'delete':
        this.plantForm = new FormGroup({
          name: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Eyða';
        break;
    }
  }

}
