import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string, areas: Area}
  ) { }

  ngOnInit() {
    this.selectedRow = this.dialogData.areas;
    if (this.dialogData.action.toLowerCase() === 'insert') {
      this.selectedRow = new Area();
      this.selectedRow.name = '';
    }
    this.setMode();
  }

  onSubmit() {
    console.log(this.areaForm.value);
    let requestModel: Area = this.areaForm.value;
    this.dataService.addArea(requestModel).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
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
          name: new FormControl({ value: '', disabled: false},
          ),
        });
        this.editMode = 'Uppfæra';
        break;
      case 'view':
        this.areaForm = new FormGroup({
          name: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Skoða';
        this.editDisabled = true;
        break;
      case 'delete':
        this.areaForm = new FormGroup({
          name: new FormControl({ value: '', disabled: true},
          ),
        });
        this.editMode = 'Eyða';
        this.editDisabled = true;
        break;
    }
  }

}
