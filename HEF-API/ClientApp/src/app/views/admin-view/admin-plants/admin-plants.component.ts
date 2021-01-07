import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Plant } from 'src/app/shared/models';
import { AdminPlantsDialogComponent } from './admin-plants-dialog/admin-plants-dialog.component';

@Component({
  selector: 'app-admin-plants',
  templateUrl: './admin-plants.component.html',
  styleUrls: ['./admin-plants.component.css']
})
export class AdminPlantsComponent implements OnInit {

  plants$: Observable<Plant[]> = this.dataService.plants$;


  public plants: Plant[];
  public customAttributes: Object;

  constructor(public dialogItem: MatDialog, private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.getData();
    this.customAttributes = {class: 'customcss'};
  }

  getData() {
    this.plants = this.dataService.plants;
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
      // this.getData();
    });
  }

}
