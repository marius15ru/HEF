import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { JobStatus, Recurring } from 'src/app/shared/enums';
import { Comment, Job, Station, User } from 'src/app/shared/models';
import { UserTaskDialogComponent } from './user-task-dialog/user-task-dialog.component';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Observable } from 'rxjs';
import { UserSubTaskDialogComponent } from './user-sub-task-dialog/user-sub-task-dialog.component';

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
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./../user-view.component.css', './user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {
  userJobs$: Observable<Job[]> = this.dataService.userJobs$;
  // availableJobs$: Observable<Job[]> = this.dataService.availableJobs$;
  jobsAssigned$: Observable<Job[]> = this.dataService.jobsAssigned$;
  jobsInProgress$: Observable<Job[]> = this.dataService.jobsInProgress$;
  jobsOnHold$: Observable<Job[]> = this.dataService.jobsOnHold$;
  jobsFinished$: Observable<Job[]> = this.dataService.jobsFinished$;

  stations$: Observable<Station[]> = this.dataService.stations$;
  comments$: Observable<Comment[]> = this.dataService.comments$;




  userJobs: Job[] = [];
  jobsAssigned: Job[] = [];
  jobsOnHold: Job[] = [];
  jobsInProgress: Job[] = [];
  jobsFinished: Job[] = [];
  stations: Station[] = [];
  comments: Comment[] = [];



  pageSettings: object;

  user: User;
  userId: string = localStorage.getItem('user').toString();

  public customAttributes: Object;

  constructor(private http: HttpClient, private dataService: DataService, public dialogItem: MatDialog) { }

  ngOnInit() {
    // this.getData();
    this.pageSettings = { pageSizes: [5, 25, 50, 100, 200, 300, 'All'], pageSize: 5};
    this.customAttributes = {class: 'customcss'};
    this.stations = this.dataService.stations;
    this.comments = this.dataService.comments;
    // this.jobsAssigned = this.dataService.jobsAssigned;
    // this.jobsInProgress = this.dataService.jobsInProgress;
    // this.jobsOnHold = this.dataService.jobsOnHold;
    // this.jobsFinished = this.dataService.jobsFinished;
  }

  recurFormatter(field: string, data: Object) {
    return Recurring[data[field]];
  }

  statusFormatter(field: string, data: Object) {
    return JobStatus[data[field]];
  }

  boolFormatter(field: string, data: Object) {
    if (data[field] === true) {
      return 'Já';
    } else {
      return 'Nei';
    }
  }

  stationFormatter(field: string, data: Object) {
    return data[field].name;
  }

  getData() {
    this.http.get<Job[]>('api/users/' + this.userId + '/jobs').subscribe(result => {
      console.log(result);
      this.userJobs = result;
      this.jobsAssigned = this.userJobs.filter(item => item.status === 2);
      this.jobsInProgress = this.userJobs.filter(item => item.status === 3);
      this.jobsOnHold = this.userJobs.filter(item => item.status === 4);
      this.jobsFinished = this.userJobs.filter(item => item.status === 5);
    }, error => console.error(error));

    this.http.get<Station[]>('api/stations').subscribe(result => {
      console.log(result);
      this.stations = result;
    }, error => console.error(error));

    this.http.get<Comment[]>('api/comments').subscribe(result => {
      console.log(result);
      this.comments = result;
    }, error => console.error(error));
  }

  openDialog(jobs: Job, action: string) {
    const refUser = this.dialogItem.open(UserTaskDialogComponent, {
      data: {
        action: action,
        job: jobs,
        stations: this.stations
      },
      width: '800px'
    });

    refUser.afterClosed().subscribe(() => {
      console.log('Dialog closed');
      this.dataService.getUserJobs(parseInt(this.userId, 0));
    });
  }

  openSubTaskDialog(jobs: Job, action: string) {
    this.dialogItem.open(UserSubTaskDialogComponent, {
      data: {
        action: action,
        job: jobs
      },
      width: '1400px'
    });
  }

}
