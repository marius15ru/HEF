import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminTasksDialogComponent } from './admin-tasks-dialog/admin-tasks-dialog.component';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  constructor(public dialogItem: MatDialog,) {}

  ngOnInit() {
  }

  openDialog(action: string){

    const refUser = this.dialogItem.open(AdminTasksDialogComponent, {
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
