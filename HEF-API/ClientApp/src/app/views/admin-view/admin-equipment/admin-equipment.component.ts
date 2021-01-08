import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Equipment, Station } from 'src/app/shared/models';
import { AdminEquipmentDialogComponent } from './admin-equipment-dialog/admin-equipment-dialog.component';

@Component({
  selector: 'app-admin-equipment',
  templateUrl: './admin-equipment.component.html',
  styleUrls: ['./admin-equipment.component.css']
})
export class AdminEquipmentComponent implements OnInit {

  equipments$: Observable<Equipment[]> = this.dataService.equipments$;

  public equipments: Equipment[];
  public stations: Station[];

  public customAttributes: Object;
  pageSettings: Object;
  
  
  constructor(public dialogItem: MatDialog, private http: HttpClient, private dataService: DataService) {}
  
  ngOnInit() {
    this.getData();
    this.customAttributes = {class: 'customcss'};
    this.pageSettings = { pageSizes: [5, 25, 50, 100, 200, 300, 'All'], pageSize: 5};
  }

  getData() {
    this.stations = this.dataService.stations;
    this.equipments = this.dataService.equipments;
  }

  stationFormatter(field: string, data: Object, column: Object) {
    return data[field].name;
  }

  openDialog(equipment: Equipment, action: string) {
    const refUser = this.dialogItem.open(AdminEquipmentDialogComponent, {
      data: {
        action: action,
        equipments: equipment
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
    // this.getData();
  }

}
