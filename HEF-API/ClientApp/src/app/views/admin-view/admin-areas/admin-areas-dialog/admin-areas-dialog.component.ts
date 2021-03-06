import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Area } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-areas-dialog',
  templateUrl: './admin-areas-dialog.component.html',
  styleUrls: ['./admin-areas-dialog.component.css']
})
export class AdminAreasDialogComponent implements OnInit {

  editMode: string;
  editDisabled = false;
  selectedRow: Area;

  areaForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AdminAreasDialogComponent>, private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, areas: Area}, private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.areas;
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new Area();
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
    console.log(this.areaForm.value);
    const requestModel: Area = this.areaForm.value;

    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        this.dataService.addArea(requestModel).subscribe(result => {
          console.log(result);
          this.dataService.getAreas();
          this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
        }, error => console.error(error));
        break;
      case 'update':
        const updateId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.updateArea(requestModel, updateId).subscribe(result => {
          console.log(result);
          this.dataService.getAreas();
          this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
        }, error => console.error(error));
        break;
      case 'delete':
        const deleteId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.deleteArea(requestModel, deleteId).subscribe(result => {
          console.log(result);
          this.dataService.getAreas();
          this.openSnackBar(requestModel.name + ' eytt', 'Loka');
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
        this.areaForm = new FormGroup({
          name: new FormControl({ value: '', disabled: false},
          ),
        });
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.areaForm = new FormGroup({
          name: new FormControl({ value: this.selectedRow.name, disabled: false},
          ),
        });
        this.editMode = 'Uppfæra';
        break;
      case 'view':
        this.areaForm = new FormGroup({
          name: new FormControl({ value: this.selectedRow.name, disabled: true},
          ),
        });
        this.editMode = 'Skoða';
        console.log(this.areaForm.valid);
        // this.editDisabled = true;
        break;
      case 'delete':
        this.areaForm = new FormGroup({
          name: new FormControl({ value: this.selectedRow.name, disabled: true},
          ),
        });
        this.editMode = 'Eyða';
        console.log(this.areaForm.valid);
        // this.editDisabled = true;
        break;
    }
  }

}
