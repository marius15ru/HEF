import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminStaffDialogComponent } from './admin-staff-dialog/admin-staff-dialog.component';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.css']
})
export class AdminStaffComponent implements OnInit {

  constructor(public dialogItem: MatDialog,) { }

  ngOnInit() {
  }

  openDialog(action: string){

    const refUser = this.dialogItem.open(AdminStaffDialogComponent, {
      data: {
        action: "Stofna",
        
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}
