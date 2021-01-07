import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Area, Plant, Station } from 'src/app/shared/models';

@Component({
  selector: 'app-admin-location-dialog',
  templateUrl: './admin-location-dialog.component.html',
  styleUrls: ['./admin-location-dialog.component.css']
})
export class AdminLocationDialogComponent implements OnInit {

  editMode: string = '';

  selectedRow = new Station;
  plants$: Observable<Plant[]> = this.dataService.plants$;
  areas$: Observable<Area[]> = this.dataService.areas$;

  locationForm = new FormGroup({
    name: new FormControl(''),
    plantId: new FormControl(''),
    areaId: new FormControl(''),
    address: new FormControl(''),
    coOrdinates: new FormControl(''),
    locationPrecise: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AdminLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, station: Station},
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log(this.dialogData);
    if(this.dialogData.action.toLowerCase() === 'insert'){
      this.selectedRow.name = '';
      this.selectedRow.plantId = null;
      this.selectedRow.locationPrecise = '';
      this.selectedRow.address = '';
      this.selectedRow.coOrdinates = '';
      this.selectedRow.areaId = null;
      this.selectedRow.description = '';
      
    }else{
      this.selectedRow = this.dialogData.station;
    }
    this.setMode();
  }

  onSubmit() {
    const requestModel: Station = this.locationForm.value;
    console.log(requestModel);
    // requestModel.areaId = requestModel.area.id;
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
         this.dataService.addStation(requestModel).subscribe(result => {
          console.log(result);
        this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
        }, error => console.error(error));       
        break;   
      case 'update':
        const updateId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        console.log(updateId);
        this.dataService.updateStation(requestModel, updateId).subscribe(result => {
          console.log(result, updateId);
        this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
        }, error => console.error(error));
        break; 
      case 'delete':
        const deleteId: string = this.selectedRow.id.toString();
        requestModel.id = this.selectedRow.id;
        this.dataService.deleteStation(requestModel, deleteId).subscribe(result => {
          console.log(result, deleteId, 'deleted');
        this.openSnackBar(requestModel.name + ' eytt', 'Loka');
        }, error => console.error(error));
        break;
    }

      setTimeout(()=> {
        this.dataService.getStations();
      }, 500);
      
      this.closeDialog();


  }

  closeDialog() {
    this.dialogRef.close('Closed');
  }

  // onSubmit() {
  //   const requestModel: Equipment = this.equipmentForm.value;

  //   switch (this.dialogData.action.toLowerCase()) {
  //     case 'insert':
  //       requestModel.lastCheck = new Date(requestModel.lastCheck);
  //       this.dataService.addEquipment(requestModel).subscribe(result => {
  //         console.log(result);
  //       this.openSnackBar(requestModel.name + ' bætt við', 'Loka');
  //       }, error => console.error(error));       
  //       break;

  //     case 'update':
  //       const updateId: string = this.selectedRow.id.toString();
  //       requestModel.id = this.selectedRow.id;
  //       console.log(updateId);
  //       this.dataService.updateEquipment(requestModel, updateId).subscribe(result => {
  //         console.log(result, updateId);
  //       this.openSnackBar(requestModel.name + ' uppfært', 'Loka');
  //       }, error => console.error(error));
  //       break;

  //     case 'delete':
  //       const deleteId: string = this.selectedRow.id.toString();
  //       requestModel.id = this.selectedRow.id;
  //       this.dataService.deleteEquipment(requestModel, deleteId).subscribe(result => {
  //         console.log(result, deleteId, 'deleted');
  //       this.openSnackBar(requestModel.name + ' eytt', 'Loka');
  //       }, error => console.error(error));
  //       break;
  //   }

  //     setTimeout(()=> {
  //       this.dataService.getEquipments();
  //     }, 500);
      
  //     this.closeDialog();
  //  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

  setMode() {
    switch (this.dialogData.action.toLowerCase()) {
      case 'insert':
        this.locationForm = new FormGroup({
          name: new FormControl({ value: '', disabled: false},
          ),
          address: new FormControl({ value: '', disabled: false},
          ),
          plantId: new FormControl({ value: null, disabled: false},
          ),
          locationPrecise: new FormControl({ value: '', disabled: false},
          ),
          description: new FormControl({ value: '', disabled: false},
          ),
          coOrdinates: new FormControl({ value: '', disabled: false},
          ),
          areaId: new FormControl({ value: null, disabled: false},
          )
        });
        this.editMode = 'Stofna';
        break;
      case 'update':
        this.editMode = 'Uppfæra';
        this.locationForm = new FormGroup({
          name: new FormControl({ value: this.selectedRow.name, disabled: false},
          ),
          address: new FormControl({ value: this.selectedRow.address, disabled: false},
          ),
          plantId: new FormControl({ value: this.selectedRow.plantId, disabled: false},
          ),
          locationPrecise: new FormControl({ value: this.selectedRow.locationPrecise, disabled: false},
          ),
          description: new FormControl({ value: this.selectedRow.description, disabled: false},
          ),
          coOrdinates: new FormControl({ value: this.selectedRow.coOrdinates, disabled: false},
          ),
          areaId: new FormControl({ value: this.selectedRow.areaId, disabled: false},
          )
        });
        break;
      case 'view':
        this.locationForm = new FormGroup({
          name: new FormControl({ value: this.selectedRow.name, disabled: true},
            ),
            address: new FormControl({ value: this.selectedRow.address, disabled: true},
              ),
            plantId: new FormControl({ value: this.selectedRow.plantId, disabled: true},
            ),
            locationPrecise: new FormControl({ value: this.selectedRow.locationPrecise, disabled: true},
            ),
            description: new FormControl({ value: this.selectedRow.description, disabled: true},
            ),
            coOrdinates: new FormControl({ value: this.selectedRow.coOrdinates, disabled: true},
            ),
            areaId: new FormControl({ value: this.selectedRow.areaId, disabled: true},
            )
        });
        this.editMode = 'Skoða';
        break;
      case 'delete':
        this.locationForm = new FormGroup({
          name: new FormControl({ value: this.selectedRow.name, disabled: true},
            ),
            address: new FormControl({ value: this.selectedRow.name, disabled: true},
            ),
            plantId: new FormControl({ value: this.selectedRow.plantId, disabled: true},
            ),
            locationPrecise: new FormControl({ value: this.selectedRow.locationPrecise, disabled: true},
            ),
            description: new FormControl({ value: this.selectedRow.description, disabled: true},
            ),
            coOrdinates: new FormControl({ value: this.selectedRow.coOrdinates, disabled: true},
            ),
            areaId: new FormControl({ value: this.selectedRow.areaId, disabled: true},
            )
        });
        this.editMode = 'Eyða';
        break;
    }
  }


}
