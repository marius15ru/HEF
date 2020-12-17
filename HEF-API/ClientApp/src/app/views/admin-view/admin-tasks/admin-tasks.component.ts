import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Job, Station } from 'src/app/shared/models';
import { AdminTasksDialogComponent } from './admin-tasks-dialog/admin-tasks-dialog.component';
import { GridComponent, RowDataBoundEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  jobs: Job[];
  alteredJobs: any[];
  recur: Recurring;
  pageSettings: object;
  currentPage: number;
  stationFormat: Station[];
  stations: Station[];
  @Inject('BASE_URL') baseUrl: string

  public toolbarOptions: ToolbarItems[];
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(public dialogItem: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.getData();
    this.toolbarOptions = ['PdfExport'];
    this.pageSettings = { pageSizes: [25, 50, 100, 200, 300, 'All'], pageSize: 25};
  }

  getData(){
    this.http.get<Job[]>('api/jobs').subscribe(result => {
      console.log(result);
      this.jobs = result;
    }, error => console.error(error));

  }

  toolbarClick(args: ClickEventArgs): void {
    console.log('toolbarClick',args);
    console.log(this.grid);
    if (args.item.id.indexOf('pdfexport') > -1) { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.grid.pdfExport();
    }
  }

  recurFormatter(field: string, data: Object, column: Object) {
    return Recurring[data[field]];
  }

  statusFormatter(field: string, data: Object, column: Object) {
    return JobStatus[data[field]];
  }

  boolFormatter(field: string, data: Object, column: Object) {
    if(data[field] == true){
      return 'Já';
    }else{
      return 'Nei';
    }
  }

  rowDataBound(args: RowDataBoundEventArgs){
    const status = 'status';
    if(args.data[status] == 1){
      args.row.classList.add('e-unassigned-color');
    }
  }

  openDialog(jobs: Job, action: string) {
    
    const refUser = this.dialogItem.open(AdminTasksDialogComponent, {
      
      data: {
        action: action,
        job: jobs
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe( (result) => {
      console.log('Dialog closed');
      this.getData();
    });
  }
}
