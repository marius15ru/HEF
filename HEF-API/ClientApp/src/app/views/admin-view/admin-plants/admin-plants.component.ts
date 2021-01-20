import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Plant } from 'src/app/shared/models';
import { AdminPlantsDialogComponent } from './admin-plants-dialog/admin-plants-dialog.component';


@Component({
  selector: 'app-admin-plants',
  templateUrl: './admin-plants.component.html',
  styleUrls: ['./../admin-view.component.css', './admin-plants.component.css']
})
export class AdminPlantsComponent implements OnInit {

  plants$: Observable<Plant[]> = this.dataService.plants$;


  public plants: Plant[];
  public customAttributes: Object;
  pageSettings: Object;


  constructor(public dialogItem: MatDialog, private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.getData();
    this.customAttributes = {class: 'customcss'};
    this.pageSettings = { pageSizes: [5, 25, 50, 100, 200, 300, 'All'], pageSize: 5};
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

    refUser.afterClosed().subscribe(() => {
      console.log('Dialog closed');
      // this.getData();
    });
  }

}
