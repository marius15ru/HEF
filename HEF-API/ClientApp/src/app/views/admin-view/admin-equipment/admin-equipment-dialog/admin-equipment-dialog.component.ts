import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Equipment, Station } from 'src/app/shared/models';

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
  ) { }

  ngOnInit() {
    this.getData();
    this.selectedRow = this.dialogData.equipments;
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new Equipment();
      this.selectedRow.stationId = null;
      this.selectedRow.name = '';
      this.selectedRow.model = null;
      this.selectedRow.manufacturer = '';
      this.selectedRow.operation = '';
      this.selectedRow.lastCheck = null;
    }
    this.setMode();
  }

  getData(){
    this.http.get<Station[]>('api/stations').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));
  }

   onSubmit() {
    switch (this.dialogData.action.toLowerCase()){
      case 'insert':
        console.log(this.equipmentForm.value);
        let requestModel: Equipment = this.equipmentForm.value;
        requestModel.model = new Date(requestModel.model);
        requestModel.lastCheck = new Date(requestModel.lastCheck);
        this.dataService.addEquipment(requestModel).subscribe(result => {
          console.log(result);
        }, error => console.error(error));
        break;
      case 'update':
        let requestModelUpdate: Equipment = this.equipmentForm.value;
        requestModelUpdate.id = this.selectedRow.id;
        this.dataService.updateEquipment(requestModelUpdate, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result, this.selectedRow.id.toString());
        }, error => console.error(error));
        break;
      case 'delete':
        let requestModelDelete: Equipment = this.equipmentForm.value;
        requestModelDelete.id = this.selectedRow.id;
        this.dataService.deleteEquipment(requestModelDelete, this.selectedRow.id.toString()).subscribe(result => {
          console.log(result, this.selectedRow.id.toString(), "deleted");
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
        this.editMode = 'Uppfæra';
        break;
      case 'view':
        this.equipmentForm = new FormGroup({
          stationId: new FormControl({ value: '', disabled: true},
          ),
          name: new FormControl({ value: '', disabled: true},
          ),
          model: new FormControl({ value: '', disabled: true},
          ),
          manufacturer: new FormControl({ value: '', disabled: true},
          ),
          operation: new FormControl({ value: '', disabled: true},
          ),
          lastCheck: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'delete':
        this.equipmentForm = new FormGroup({
          stationId: new FormControl({ value: '', disabled: true},
          ),
          name: new FormControl({ value: '', disabled: true},
          ),
          model: new FormControl({ value: '', disabled: true},
          ),
          manufacturer: new FormControl({ value: '', disabled: true},
          ),
          operation: new FormControl({ value: '', disabled: true},
          ),
          lastCheck: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Eyða';
        this.editDisabled = true;
        break;
    }
  }

}
