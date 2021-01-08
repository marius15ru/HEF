import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Area } from 'src/app/shared/models';
import { AdminAreasDialogComponent } from './admin-areas-dialog/admin-areas-dialog.component';

@Component({
  selector: 'app-admin-areas',
  templateUrl: './admin-areas.component.html',
  styleUrls: ['./admin-areas.component.css']
})
export class AdminAreasComponent implements OnInit {

  public areas: Area[] = [];

  areas$: Observable<Area[]> = this.dataService.areas$;
  
  public customAttributes: Object;
  pageSettings: Object;

  constructor(
    public dialogItem: MatDialog, 
    private http: HttpClient, 
    private dataService: DataService) {}

  ngOnInit() {
    this.getData();
    this.customAttributes = {class: 'customcss'};
    this.pageSettings = { pageSizes: [5, 25, 50, 100, 200, 300, 'All'], pageSize: 5};
  }

  getData() {
    this.areas = this.dataService.areas;
  }

  openDialog(area: Area, action: string) {

    const refUser = this.dialogItem.open(AdminAreasDialogComponent, {
      data: {
        action: action,
        areas: area
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}
