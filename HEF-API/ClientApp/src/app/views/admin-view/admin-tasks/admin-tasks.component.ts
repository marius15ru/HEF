import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Comment, Job, Station } from 'src/app/shared/models';
import { AdminTasksDialogComponent } from './admin-tasks-dialog/admin-tasks-dialog.component';
import { FilterSettings, FilterSettingsModel, GridComponent, RowDataBoundEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DataService } from 'src/app/data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  // jobs$: Observable<Job[]> = this.dataService.jobs$;
  filteredJobs$: Observable<Job[]> = this.dataService.filteredJobs$;
  stations$: Observable<Station[]> = this.dataService.stations$;
  comments$: Observable<Comment[]> = this.dataService.comments$;


  jobs: Job[] = [];
  alteredJobs: any[];
  recur: Recurring;
  pageSettings: Object;
  filterSettings: FilterSettingsModel;
  currentPage: number;
  stationFormat: Station[];
  stations: Station[];
  jobsOnHold: Job[];
  comments: Comment[];
  initialGridLoad = true;
  jobStatus = JobStatus;
  selectedJobStatuses: number[] = [];
  selectedStations: number[] = [];

  public customAttributes: Object;
  @Inject('BASE_URL') baseUrl: string;

  public toolbarOptions: ToolbarItems[];
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(public dialogItem: MatDialog, private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.toolbarOptions = ['PdfExport'];
    this.pageSettings = { pageSizes: [5, 25, 50, 100, 200, 300, 'All'], pageSize: 5};
    this.customAttributes = {class: 'customcss'};
    
    this.getData();
  }

  getData(){
    this.jobs = this.dataService.jobs;
    this.comments = this.dataService.comments;
    this.stations = this.dataService.stations;
  }

  clearFilter(){
    this.selectedJobStatuses = [];
    this.selectedStations = [];
    this.filterJobs();
  }

  filterJobs(){
    // console.log(this.selectedJobStatuses, this.selectedStations, this.dataService.jobs);
    this.dataService.filterJobs(this.selectedJobStatuses, this.selectedStations, this.dataService.jobs);
  }


  toolbarClick(args: ClickEventArgs): void {
    console.log('toolbarClick', args);
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
  
  stationFormatter(field: string, data: Object, column: Object) {
    return data[field].name;
  }

  boolFormatter(field: string, data: Object, column: Object) {
    if (data[field] === true) {
      return 'Já';
    } else {
      return 'Nei';
    }
  }

  

  rowDataBound(args: RowDataBoundEventArgs) {
    const status = 'status';
    if (args.data[status] === 1) {
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
    });
  }
}
