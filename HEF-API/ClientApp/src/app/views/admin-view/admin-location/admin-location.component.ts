import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminLocationDialogComponent } from './admin-location-dialog/admin-location-dialog.component';

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.css']
})
export class AdminLocationComponent implements OnInit {

  constructor(public dialogItem: MatDialog,) { }

  ngOnInit() {
  }

  openDialog(){

    const refUser = this.dialogItem.open(AdminLocationDialogComponent, {
      data: {},
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}
