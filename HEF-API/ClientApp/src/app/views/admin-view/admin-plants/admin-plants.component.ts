import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminPlantsDialogComponent } from './admin-plants-dialog/admin-plants-dialog.component';

@Component({
  selector: 'app-admin-plants',
  templateUrl: './admin-plants.component.html',
  styleUrls: ['./admin-plants.component.css']
})
export class AdminPlantsComponent implements OnInit {

  constructor(public dialogItem: MatDialog,) { }

  ngOnInit() {
  }

  openDialog(){

    const refUser = this.dialogItem.open(AdminPlantsDialogComponent, {
      data: {},
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}
