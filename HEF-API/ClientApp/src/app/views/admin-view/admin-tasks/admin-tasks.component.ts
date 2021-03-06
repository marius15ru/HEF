import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Area, Comment, Job, Plant, Station, User } from 'src/app/shared/models';
import { AdminTasksDialogComponent } from './admin-tasks-dialog/admin-tasks-dialog.component';
import { FilterSettingsModel, GridComponent, RowDataBoundEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { AdminSubTaskDialogComponent } from './admin-sub-task-dialog/admin-sub-task-dialog.component';
import { AdminSubTaskHistoryDialogComponent } from './admin-sub-task-history-dialog/admin-sub-task-history-dialog.component';


setCulture('is');

L10n.load({
    'is': {
        grid: {
           EmptyRecord: 'Engar raðir í töflu',
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
  styleUrls: ['./../admin-view.component.css', './admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  // jobs$: Observable<Job[]> = this.dataService.jobs$;
  filteredJobs$: Observable<Job[]> = this.dataService.filteredJobs$;
  stations$: Observable<Station[]> = this.dataService.stations$;
  comments$: Observable<Comment[]> = this.dataService.comments$;
  filteredComments$: Observable<Comment[]> = this.dataService.filteredComments$;
  jobs$: Observable<Job[]> = this.dataService.jobs$;
  users$: Observable<User[]> = this.dataService.users$;
  plants$: Observable<Plant[]> = this.dataService.plants$;
  areas$: Observable<Area[]> = this.dataService.areas$;

  jobFilters: { [key: string]: any } = this.dataService.jobFilters;
  commentFilters: { [key: string]: any } = this.dataService.commentFilters;

  filtersVisible = false;
  filterAction = 'Sýna síur';

  commentFiltersVisible = false;
  commentFilterAction = 'Sýna síur';

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

  seen: boolean = null;

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

  deleteComment(comment: Comment) {
    this.dataService.deleteJobComment(comment);
  }

  getData() {
    this.jobs = this.dataService.jobs;
    this.comments = this.dataService.comments;
    this.stations = this.dataService.stations;
  }

  getCurrentDate() {
    const today = new Date();
    return today;
  }

  filtersVisibleToggle(data: string) {
    switch (data) {
      case 'jobs':
        if (!this.filtersVisible) {
          this.filterAction = 'Fela síur';
          return this.filtersVisible = true;
        }
        this.filterAction = 'Sýna síur';
        return this.filtersVisible = false;
        break;
      case 'comments':
        if (!this.commentFiltersVisible) {
          this.filterAction = 'Fela síur';
          return this.commentFiltersVisible = true;
        }
        this.filterAction = 'Sýna síur';
        return this.commentFiltersVisible = false;
        break;
    }
  }

  clearJobFilter() {
    this.jobFilters = {};
    this.filterJobs();
  }

  filterJobs() {
    this.dataService.filterJobs(
      this.jobFilters,
      this.dataService.jobs
    );
  }

  clearCommentFilter() {
    this.commentFilters = {};
    this.filterComments();
  }

  filterComments() {
    this.dataService.filterComments(
      this.commentFilters,
      this.dataService.comments
    );
  }

  toolbarClick(args: ClickEventArgs): void {
    console.log('toolbarClick', args);
    console.log(this.grid);
    if (args.item.id.indexOf('pdfexport') > -1) { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.grid.pdfExport();
    }
  }

  recurFormatter(field: string, data: Object) {
    return Recurring[data[field]];
  }

  statusFormatter(field: string, data: Object) {
    return JobStatus[data[field]];
  }

  stationFormatter(field: string, data: Object) {
    return data[field].name;
  }

  boolFormatter(field: string, data: Object,) {
    if (data[field] === true) {
      return 'Já';
    } else {
      return 'Nei';
    }
  }

  userFormatter(field: string, data: Object) {
    return data[field].name;
  }

  jobFormatter(field: string, data: Object) {
    return data[field].name;
  }

  rowDataBound(args: RowDataBoundEventArgs) {
    const status = 'status';
    const completeBy = 'completeBy';
    const today = new Date();
    const dueDate = new Date(args.data[completeBy]);
    if (args.data[status] === 1) {
      args.row.classList.add('e-unassigned-color');
    }
    if (args.data[status] === 4) {
      args.row.classList.add('e-on-hold-color');
    }
    if (today > dueDate && args.data[status] !== 5) {
      args.row.classList.add('e-overdue-color');
    }
    if (args.data[status] === 5) {
      args.row.classList.add('e-finished-color');
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

    refUser.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }

  openSubTaskDialog(jobs: Job, action: string) {
    this.dialogItem.open(AdminSubTaskDialogComponent, {
      data: {
        action: action,
        job: jobs
      },
      width: '1400px'
    });
  }

  openSubTaskHistoryDialog(jobs: Job, action: string) {
    this.dialogItem.open(AdminSubTaskHistoryDialogComponent, {
      data: {
        action: action,
        job: jobs
      },
      width: '1200px'
    });
  }
}
