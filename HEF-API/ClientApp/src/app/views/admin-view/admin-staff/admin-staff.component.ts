import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/models';
import { AdminStaffDialogComponent } from './admin-staff-dialog/admin-staff-dialog.component';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.css']
})
export class AdminStaffComponent implements OnInit {
  
  public users: User[];

  constructor(public dialogItem: MatDialog, private http: HttpClient, @Inject('BASE_URL') baseUrl: string){
    http.get<User[]>(baseUrl + 'api/users').subscribe(result => {
      console.log(result);
      this.users = result;
    }, error => console.error(error));
   }

  ngOnInit() {
  }

  openDialog(action: string) {

    const refUser = this.dialogItem.open(AdminStaffDialogComponent, {
      data: {
        action: 'Stofna',
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}
