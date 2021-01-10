import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Equipment, Station } from 'src/app/shared/models';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-admin-equipment-dialog',
  templateUrl: './admin-equipment-dialog.component.html',
  styleUrls: ['./admin-equipment-dialog.component.css']
})
export class AdminEquipmentDialogComponent implements OnInit {

  dialogAction: '';
  editMode: string;
  editDisabled = false;
  selectedRow: Equipment;
  stations: Station[];

  equipmentForm = new FormGroup({
    station: new FormControl(''),
    name: new FormControl(''),
    model: new FormControl(''),
    manufacturer: new FormControl(''),
    operation: new FormControl(''),
    lastCheck: new FormControl(''),
  });

  constructor(
    private dataService: DataService, public dialogRef: MatDialogRef<AdminEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, equipments: Equipment}, private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getData();
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new Equipment();
      this.selectedRow.stationId = null;
      this.selectedRow.name = '';
      this.selectedRow.model = null;
      this.selectedRow.manufacturer = '';
      this.selectedRow.operation = '';
      this.selectedRow.lastCheck = null;
    }else{
      this.selectedRow = this.dialogData.equipments;
    }
    this.setMode();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  getData() {
    this.stations = this.dataService.stations;
  }

  getCurrentDate(){
    const today = new Date();
    return today;
  }

   onSubmit() {
    const requestModel: Equipment = this.equipmentForm.value;

    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        requestModel.lastCheck = new Date(requestModel.lastCheck);
        this.dataService.addEquipment(requestModel).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
        }, error => console.error(error));       
        break;

      case 'update':
        const updateId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        console.log(updateId);
        this.dataService.updateEquipment(requestModel, updateId).subscribe(result => {
          console.log(result, updateId);
        this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
        }, error => console.error(error));
        break;

      case 'delete':
        const deleteId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.deleteEquipment(requestModel, deleteId).subscribe(result => {
          console.log(result, deleteId, 'deleted');
        this.openSnackBar(requestModel.name + ' eytt', 'Loka');
        }, error => console.error(error));
        break;
    }

      setTimeout(()=> {
        this.dataService.getEquipments();
      }, 500);
      
      this.closeDialog();
   }

   closeDialog() {
    this.dialogRef.close('Closed');
  }

  setMode() {
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        this.equipmentForm = new FormGroup({
          stationId: new FormControl({ value: '', disabled: false},
          ),
          name: new FormControl({ value: '', disabled: false},
          ),
          model: new FormControl({ value: '', disabled: false},
          ),
          manufacturer: new FormControl({ value: '', disabled: false},
          ),
          operation: new FormControl({ value: '', disabled: false},
          ),
          lastCheck: new FormControl({ value: '', disabled: false},
          ),
        });
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.equipmentForm = new FormGroup({
          stationId: new FormControl({ value: this.selectedRow.stationId, disabled: false},
          ),
          name: new FormControl({ value: this.selectedRow.name, disabled: false},
          ),
          model: new FormControl({ value: this.selectedRow.model, disabled: false},
          ),
          manufacturer: new FormControl({ value: this.selectedRow.manufacturer, disabled: false},
          ),
          operation: new FormControl({ value: this.selectedRow.operation, disabled: false},
          ),
          lastCheck: new FormControl({ value: this.selectedRow.lastCheck, disabled: false},
          ),
        });
        this.editMode = 'Uppfæra';
        break;
      case 'view':
        this.equipmentForm = new FormGroup({
        stationId: new FormControl({ value: this.selectedRow.stationId, disabled: true},
        ),
        name: new FormControl({ value: this.selectedRow.name, disabled: true},
        ),
        model: new FormControl({ value: this.selectedRow.model, disabled: true},
        ),
        manufacturer: new FormControl({ value: this.selectedRow.manufacturer, disabled: true},
        ),
        operation: new FormControl({ value: this.selectedRow.operation, disabled: true},
        ),
        lastCheck: new FormControl({ value: this.selectedRow.lastCheck, disabled: true},
        ),
        });
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'delete':
        this.equipmentForm = new FormGroup({
        stationId: new FormControl({ value: this.selectedRow.stationId, disabled: true},
        ),
        name: new FormControl({ value: this.selectedRow.name, disabled: true},
        ),
        model: new FormControl({ value: this.selectedRow.model, disabled: true},
        ),
        manufacturer: new FormControl({ value: this.selectedRow.manufacturer, disabled: true},
        ),
        operation: new FormControl({ value: this.selectedRow.operation, disabled: true},
        ),
        lastCheck: new FormControl({ value: this.selectedRow.lastCheck, disabled: true},
        ),
        });
        this.editMode = 'Eyða';
        this.editDisabled = true;
        break;
    }
  }

}
