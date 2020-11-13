import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-areas-dialog',
  templateUrl: './admin-areas-dialog.component.html',
  styleUrls: ['./admin-areas-dialog.component.css']
})
export class AdminAreasDialogComponent implements OnInit {

  editMode: string = "";

  areaForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AdminAreasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {action: string}
  ) { }

  ngOnInit() {
    this.setMode();
  }

  onSubmit() {
    console.warn(this.areaForm.value);
  }

  setMode(){
    if(this.dialogData.action.toLowerCase() == 'insert'){
      this.editMode = 'Stofna';
    }else if(this.dialogData.action.toLowerCase() == 'update'){
      this.editMode = 'Uppfæra';
    }else if(this.dialogData.action.toLowerCase() == 'view'){
      this.editMode = 'Skoða';
    }else{
      this.editMode = 'Eyða';
    }
  }

}
