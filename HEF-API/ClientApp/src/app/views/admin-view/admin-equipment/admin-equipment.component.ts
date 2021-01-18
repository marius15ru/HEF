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
  filteredEquipments$: Observable<Equipment[]> = this.dataService.filteredEquipments$;
  stations$: Observable<Station[]> = this.dataService.stations$;


  public equipments: Equipment[];
  public stations: Station[];

  public customAttributes: Object;
  pageSettings: Object;

  filtersVisible = false;
  filterAction = 'Sýna síur';

  selectedStations: number[] = [];

  lastCheckFrom: Date = null;
  lastCheckTo: Date = null;

  constructor(public dialogItem: MatDialog, private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.getData();
    this.customAttributes = {class: 'customcss'};
    this.pageSettings = { pageSizes: [5, 10, 20, 50, 100, 200, 'All'], pageSize: 10};
  }

  getCurrentDate() {
    return new Date();
  }

  filtersVisibleToggle() {
    if (!this.filtersVisible) {
      this.filterAction = 'Fela síur';
      return this.filtersVisible = true;
    }
    this.filterAction = 'Sýna síur';
    return this.filtersVisible = false;
  }

  filterEquipment() {
    this.dataService.filterEquipments(this.selectedStations, this.lastCheckFrom, this.lastCheckTo, this.dataService.equipments);
  }

  clearEquipmentFilter() {
    this.selectedStations = [];
    this.lastCheckFrom = null;
    this.lastCheckTo = null;
    this.filterEquipment();
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
