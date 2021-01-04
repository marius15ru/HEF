import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DataOperation } from 'src/app/shared/enums';
import { Station } from 'src/app/shared/models';
import { AdminLocationDialogComponent } from './admin-location-dialog/admin-location-dialog.component';

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.css']
})
export class AdminLocationComponent implements OnInit {

  public stations: Station[];

  public toolbarOptions: ToolbarItems[];
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  public customAttributes: Object;

  constructor(public dialogItem: MatDialog, private http: HttpClient) {}



  ngOnInit() {
    this.getData();
    this.toolbarOptions = ['PdfExport'];
    this.customAttributes = {class: 'customcss'};
  }

  getData(){
    this.http.get<Station[]>('api/stations').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));
  }

  toolbarClick(args: ClickEventArgs): void {
    console.log('toolbarClick',args);
    console.log(this.grid);
    if (args.item.id.indexOf('pdfexport') > -1) { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.grid.pdfExport();
    }
  }

  openDialog(action: string) {

    const refUser = this.dialogItem.open(AdminLocationDialogComponent, {
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

// interface Area {
//   id: number;
//   name: string;
// }
