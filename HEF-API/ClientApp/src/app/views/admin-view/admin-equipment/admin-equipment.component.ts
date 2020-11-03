import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminEquipmentDialogComponent } from './admin-equipment-dialog/admin-equipment-dialog.component';

@Component({
  selector: 'app-admin-equipment',
  templateUrl: './admin-equipment.component.html',
  styleUrls: ['./admin-equipment.component.css']
})
export class AdminEquipmentComponent implements OnInit {

  constructor(public dialogItem: MatDialog,) { }

  ngOnInit() {
  }

  openDialog(){

    const refUser = this.dialogItem.open(AdminEquipmentDialogComponent, {
      data: {},
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}
