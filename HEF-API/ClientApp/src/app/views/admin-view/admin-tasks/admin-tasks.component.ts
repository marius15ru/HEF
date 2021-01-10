import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Comment, Job, Station, User } from 'src/app/shared/models';
import { AdminTasksDialogComponent } from './admin-tasks-dialog/admin-tasks-dialog.component';
import { FilterSettings, FilterSettingsModel, GridComponent, RowDataBoundEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DataService } from 'src/app/data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import {FormGroup, FormControl} from '@angular/forms';


setCulture('is'); 

L10n.load({ 
    'is': { 
        grid: { 
           EmptyRecord:"Engar raðir í töflu",
        },
        pager: {
          pagerDropDown: 'Raðir á hverri síðu',
          currentPageInfo: '{0} af {1} Síðum',
          totalItemsInfo: '({0} Raðir)',
          firstPageTooltip: 'Fara á fyrstu síðu',
          lastPageTooltip: 'Fara á öftustu síðu',
          nextPageTooltip: 'Færa á næstu síðu',
          previousPageTooltip: 'Fara á fyrri síðu',
        }
    } 
}); 

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
  filteredComments$: Observable<Comment[]> = this.dataService.filteredComments$;
  jobs$: Observable<Job[]> = this.dataService.jobs$;
  users$: Observable<User[]> = this.dataService.users$;


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
  selectedUsers: number[] = [];
  selectedJobs: number[] = [];
  hasComments: boolean;
  emergencyJobs: boolean;


  lastCheckFrom: Date = null;
  lastCheckTo: Date = null;

  completeByFrom: Date = null;
  completeByTo: Date = null;

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

  getCurrentDate(){
    const today = new Date();
    return today;
  }

  clearJobFilter(){
    this.selectedJobStatuses = [];
    this.selectedStations = [];
    this.hasComments = null;
    this.emergencyJobs = null;
    this.lastCheckFrom = null;
    this.lastCheckTo = null;
    this.completeByFrom = null;
    this.completeByTo = null;
    this.filterJobs();
  }

  filterJobs(){
    console.log(this.completeByFrom);
    console.log(this.completeByTo);

    this.dataService.filterJobs(
      this.selectedJobStatuses, 
      this.selectedStations, 
      this.hasComments, 
      this.emergencyJobs, 
      this.lastCheckFrom, 
      this.lastCheckTo, 
      this.completeByFrom, 
      this.completeByTo , 
      this.dataService.jobs);
  }
  
  clearCommentFilter(){
    this.selectedUsers = [];
    this.selectedJobs = [];
    this.filterComments();
  }

  filterComments(){
    this.dataService.filterComments(this.selectedUsers, this.selectedJobs, this.dataService.comments)
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

  userFormatter(field: string, data: Object, column: Object) {
    return data[field].name;
  }

  jobFormatter(field: string, data: Object, column: Object) {
    return data[field].name;
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
