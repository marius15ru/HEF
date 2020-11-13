import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Area } from 'src/app/shared/models';
import { AdminAreasDialogComponent } from './admin-areas-dialog/admin-areas-dialog.component';

@Component({
  selector: 'app-admin-areas',
  templateUrl: './admin-areas.component.html',
  styleUrls: ['./admin-areas.component.css']
})
export class AdminAreasComponent implements OnInit {

  public areas: Area[];

  constructor(public dialogItem: MatDialog, private http: HttpClient, @Inject('BASE_URL') baseUrl: string){
    http.get<Area[]>(baseUrl + 'api/areas').subscribe(result => {
      console.log(result);
      this.areas = result;
    }, error => console.error(error));
   }

  ngOnInit() {
  }

  openDialog(item: Area, action: string) {

    const refUser = this.dialogItem.open(AdminAreasDialogComponent, {
      data: {
        action: action,
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}
