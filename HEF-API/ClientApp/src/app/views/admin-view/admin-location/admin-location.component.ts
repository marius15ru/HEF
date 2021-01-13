import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { DataOperation } from 'src/app/shared/enums';
import { Area, Plant, Station } from 'src/app/shared/models';
import { AdminLocationDialogComponent } from './admin-location-dialog/admin-location-dialog.component';

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.css']
})
export class AdminLocationComponent implements OnInit {

  filteredStations$: Observable<Station[]> = this.dataService.filteredStations$;
  stations$: Observable<Station[]> = this.dataService.stations$;
  plants$: Observable<Plant[]> = this.dataService.plants$;
  areas$: Observable<Area[]> = this.dataService.areas$;

  selectedPlants: number[] = [];
  selectedAreas: number[] = [];

  filtersVisible: boolean = false;
  filterAction: string = 'Sýna síur';
  
  public stations: Station[];

  pageSettings: Object;

  public toolbarOptions: ToolbarItems[];
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  public customAttributes: Object;

  constructor(public dialogItem: MatDialog, private http: HttpClient, private dataService: DataService) {}



  ngOnInit() {
    // this.getData();
    this.toolbarOptions = ['PdfExport'];
    this.customAttributes = {class: 'customcss'};
    this.pageSettings = { pageSizes: [5, 10, 20, 50, 100, 200, 'All'], pageSize: 10};
  }

  getData() {
    this.http.get<Station[]>('api/stations').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));
  }

  filtersVisibleToggle(){
    if(!this.filtersVisible){
      this.filterAction = 'Fela síur';
      return this.filtersVisible = true;
    }
    this.filterAction = 'Sýna síur';
    return this.filtersVisible = false;
  }

  filterStations(){
    this.dataService.filterStations(this.selectedPlants, this.selectedAreas, this.dataService.stations);
  }

  clearStationFilter(){
    this.selectedAreas = [];
    this.selectedPlants = [];

    this.filterStations();
  }

  plantFormatter(field: string, data: Object, column: Object) {
    return data[field].name;
  }


  areaFormatter(field: string, data: Object, column: Object) {
    return data[field].name;
  }

  toolbarClick(args: ClickEventArgs): void {
    console.log('toolbarClick', args);
    console.log(this.grid);
    if (args.item.id.indexOf('pdfexport') > -1) { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.grid.pdfExport();
    }
  }

  openDialog(station: Station, action: string) {

    const refUser = this.dialogItem.open(AdminLocationDialogComponent, {
      data: {
        action: action,
        station: station
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
    });
  }

}

// interface Area {
//   id: number;
//   name: string;
// }
