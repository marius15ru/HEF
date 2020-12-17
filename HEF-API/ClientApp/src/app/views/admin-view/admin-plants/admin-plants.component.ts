import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Plant } from 'src/app/shared/models';
import { AdminPlantsDialogComponent } from './admin-plants-dialog/admin-plants-dialog.component';

@Component({
  selector: 'app-admin-plants',
  templateUrl: './admin-plants.component.html',
  styleUrls: ['./admin-plants.component.css']
})
export class AdminPlantsComponent implements OnInit {

  public plants: Plant[];

  constructor(public dialogItem: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get<Plant[]>('api/plants').subscribe(result => {
      console.log(result);
      this.plants = result;
    }, error => console.error(error));
  }

  openDialog(plants: Plant, action: string) {

    const refUser = this.dialogItem.open(AdminPlantsDialogComponent, {
      data: {
        action: action,
        plant: plants
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
      this.getData();
    });
  }

}
