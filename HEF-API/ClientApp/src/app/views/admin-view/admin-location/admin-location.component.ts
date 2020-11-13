import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataOperation } from 'src/app/shared/enums';
import { AdminLocationDialogComponent } from './admin-location-dialog/admin-location-dialog.component';

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.css']
})
export class AdminLocationComponent implements OnInit {


  constructor(public dialogItem: MatDialog){
   }

   

  ngOnInit() {
    
  }

  openDialog(action: string) {

    const refUser = this.dialogItem.open(AdminLocationDialogComponent, {
      data: {
        action: 'Stofna'
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}

// interface Area {
//   id: number;
//   name: string;
// }
